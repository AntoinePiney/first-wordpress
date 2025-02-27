import { useState, useEffect, useRef, useCallback } from "react";
import { BASE_IMAGES, SCROLL_SETTINGS } from "../constants";
import {
  ScrollState,
  TouchState,
  ViewportSize,
  MediaItem,
  OGLModules,
  ScrollDirection,
  WebGLResources,
} from "../types";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "../shaders";

export function useWebGLGallery(
  gallerySelector: string,
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  // États
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Références
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const oglModulesRef = useRef<OGLModules | null>(null);
  const mediasRef = useRef<MediaItem[]>([]);
  const animationId = useRef<number | null>(null);

  // WebGL resources
  const webglRef = useRef<WebGLResources>({
    renderer: null,
    camera: null,
    scene: null,
    gl: null,
    geometry: null,
  });

  // État de défilement
  const scrollRef = useRef<ScrollState>({
    ease: SCROLL_SETTINGS.ease,
    current: 0,
    target: 0,
    last: 0,
  });

  // État du toucher
  const touchRef = useRef<TouchState>({
    isDown: false,
    position: 0,
    start: 0,
  });

  // Dimensions
  const viewportRef = useRef<ViewportSize>({ width: 0, height: 0 });
  const screenRef = useRef<ViewportSize>({ width: 0, height: 0 });
  const galleryHeightRef = useRef<number>(0);

  // Direction et vitesse
  const directionRef = useRef<ScrollDirection>("down");
  const speedRef = useRef<number>(SCROLL_SETTINGS.initialSpeed);

  // Gestionnaire d'erreurs
  const handleWebGLError = useCallback((message: string, error?: unknown) => {
    console.error(message, error);
    setError(`Erreur WebGL: ${message}`);
  }, []);

  // Fonction pour charger une image
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Fonctions de mise à jour des médias
  const updateMediaScale = useCallback((media: MediaItem) => {
    if (!media.bounds) return;
    media.mesh.scale.x =
      (viewportRef.current.width * media.bounds.width) /
      screenRef.current.width;
    media.mesh.scale.y =
      (viewportRef.current.height * media.bounds.height) /
      screenRef.current.height;
  }, []);

  const updateMediaX = useCallback((media: MediaItem, x: number = 0) => {
    if (!media.bounds) return;
    media.mesh.position.x =
      -(viewportRef.current.width / 2) +
      media.mesh.scale.x / 2 +
      ((media.bounds.left - x) / screenRef.current.width) *
        viewportRef.current.width;
  }, []);

  const updateMediaY = useCallback((media: MediaItem, y: number = 0) => {
    if (!media.bounds) return;
    media.mesh.position.y =
      viewportRef.current.height / 2 -
      media.mesh.scale.y / 2 -
      ((media.bounds.top - y) / screenRef.current.height) *
        viewportRef.current.height -
      media.extra;
  }, []);

  const updateMediaBounds = useCallback(() => {
    mediasRef.current.forEach((media) => {
      try {
        media.bounds = media.element.getBoundingClientRect();
        updateMediaScale(media);
        updateMediaX(media);
        updateMediaY(media);
        if (media.program.uniforms.uPlaneSizes) {
          media.program.uniforms.uPlaneSizes.value = [
            media.mesh.scale.x,
            media.mesh.scale.y,
          ];
        }
      } catch (err) {
        handleWebGLError("Erreur lors de la mise à jour des dimensions", err);
      }
    });
  }, [updateMediaScale, updateMediaX, updateMediaY, handleWebGLError]);

  // Gestion des événements
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!canvasRef.current || touchRef.current.isDown) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      mediasRef.current.forEach((media, index) => {
        const meshPosition = {
          x: media.mesh.position.x,
          y: media.mesh.position.y,
        };

        const meshScale = {
          x: media.mesh.scale.x,
          y: media.mesh.scale.y,
        };

        if (
          x >= meshPosition.x - meshScale.x / 2 &&
          x <= meshPosition.x + meshScale.x / 2 &&
          y >= meshPosition.y - meshScale.y / 2 &&
          y <= meshPosition.y + meshScale.y / 2
        ) {
          setActiveIndex(index);

          const originalScale = { x: meshScale.x, y: meshScale.y };
          const startTime = performance.now();

          const animate = () => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / 300, 1);
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const scale = 1 + Math.sin(ease * Math.PI) * 0.1;

            media.mesh.scale.x = originalScale.x * scale;
            media.mesh.scale.y = originalScale.y * scale;
            media.program.uniforms.uStrength.value =
              Math.sin(ease * Math.PI) * 2;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              media.mesh.scale.x = originalScale.x;
              media.mesh.scale.y = originalScale.y;
              media.program.uniforms.uStrength.value = 0;
              setActiveIndex(null);
            }
          };

          requestAnimationFrame(animate);
          console.log("Clicked image:", index);
        }
      });
    },
    [canvasRef]
  );

  const handleResize = useCallback(() => {
    if (
      !webglRef.current.renderer ||
      !webglRef.current.camera ||
      !canvasRef.current ||
      !galleryRef.current
    )
      return;

    try {
      screenRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      webglRef.current.renderer.setSize(
        screenRef.current.width,
        screenRef.current.height
      );

      webglRef.current.camera.perspective({
        aspect: canvasRef.current.width / canvasRef.current.height,
      });

      const fov = webglRef.current.camera.fov * (Math.PI / 180);
      const height = 2 * Math.tan(fov / 2) * webglRef.current.camera.position.z;
      const width = height * webglRef.current.camera.aspect;

      viewportRef.current = { width, height };

      const galleryBounds = galleryRef.current.getBoundingClientRect();
      galleryHeightRef.current =
        (viewportRef.current.height * galleryBounds.height) /
        screenRef.current.height;

      if (mediasRef.current.length > 0) {
        mediasRef.current.forEach((media) => {
          media.extra = 0;
          if (media.program.uniforms.uViewportSizes) {
            media.program.uniforms.uViewportSizes.value = [
              viewportRef.current.width,
              viewportRef.current.height,
            ];
          }
        });

        updateMediaBounds();
      }
    } catch (err) {
      handleWebGLError("Erreur lors du redimensionnement", err);
    }
  }, [updateMediaBounds, canvasRef, handleWebGLError]);

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    scrollRef.current.target += event.deltaY * 0.5;
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    touchRef.current.isDown = true;
    touchRef.current.position = scrollRef.current.current;
    touchRef.current.start = event.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!touchRef.current.isDown) return;
    const y = event.touches[0].clientY;
    const distance = (touchRef.current.start - y) * 2;
    scrollRef.current.target = touchRef.current.position + distance;
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchRef.current.isDown = false;
  }, []);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    touchRef.current.isDown = true;
    touchRef.current.position = scrollRef.current.current;
    touchRef.current.start = event.clientY;
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!touchRef.current.isDown) return;
    const y = event.clientY;
    const distance = (touchRef.current.start - y) * 2;
    scrollRef.current.target = touchRef.current.position + distance;
  }, []);

  const handleMouseUp = useCallback(() => {
    touchRef.current.isDown = false;
  }, []);

  // Calcul de la distorsion
  const calculateDistortionStrength = useCallback(
    (current: number, last: number): number => {
      const normalized = ((current - last) / screenRef.current.width) * 10;
      return Math.max(-15, Math.min(15, normalized));
    },
    []
  );

  // Boucle d'animation principale
  const update = useCallback(() => {
    try {
      scrollRef.current.target += speedRef.current;
      scrollRef.current.current =
        scrollRef.current.current +
        (scrollRef.current.target - scrollRef.current.current) *
          scrollRef.current.ease;

      if (scrollRef.current.current > scrollRef.current.last) {
        directionRef.current = "down";
        speedRef.current = SCROLL_SETTINGS.initialSpeed;
      } else if (scrollRef.current.current < scrollRef.current.last) {
        directionRef.current = "up";
        speedRef.current = -SCROLL_SETTINGS.initialSpeed;
      }

      const distortionStrength = calculateDistortionStrength(
        scrollRef.current.current,
        scrollRef.current.last
      );

      mediasRef.current.forEach((media) => {
        updateMediaScale(media);
        updateMediaX(media);
        updateMediaY(media, scrollRef.current.current);

        const planeOffset = media.mesh.scale.y / 2;
        const viewportOffset = viewportRef.current.height / 2;
        const isBefore = media.mesh.position.y + planeOffset < -viewportOffset;
        const isAfter = media.mesh.position.y - planeOffset > viewportOffset;

        if (directionRef.current === "up" && isBefore) {
          media.extra -= galleryHeightRef.current;
        }

        if (directionRef.current === "down" && isAfter) {
          media.extra += galleryHeightRef.current;
        }

        media.program.uniforms.uStrength.value = distortionStrength;
      });

      if (
        webglRef.current.renderer &&
        webglRef.current.scene &&
        webglRef.current.camera
      ) {
        webglRef.current.renderer.render({
          scene: webglRef.current.scene,
          camera: webglRef.current.camera,
        });
      }

      scrollRef.current.last = scrollRef.current.current;
      animationId.current = requestAnimationFrame(update);
    } catch (err) {
      handleWebGLError("Erreur dans la boucle d'animation", err);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    }
  }, [
    updateMediaScale,
    updateMediaX,
    updateMediaY,
    calculateDistortionStrength,
    handleWebGLError,
  ]);

  // Création des médias
  const createMedias = useCallback(async () => {
    if (
      !galleryRef.current ||
      !webglRef.current.gl ||
      !webglRef.current.geometry ||
      !webglRef.current.scene ||
      !oglModulesRef.current
    ) {
      handleWebGLError("Références manquantes pour la création des médias");
      return;
    }

    try {
      const gl = webglRef.current.gl;
      const { Mesh, Program, Texture } = oglModulesRef.current;
      const mediaElements =
        galleryRef.current.querySelectorAll(gallerySelector);

      const createSingleMedia = async (element: Element, index: number) => {
        const texture = new Texture(gl, { generateMipmaps: false });

        try {
          const imageObj = await loadImage(
            BASE_IMAGES[index % BASE_IMAGES.length]
          );
          texture.image = imageObj;

          const program = new Program(gl, {
            fragment: FRAGMENT_SHADER,
            vertex: VERTEX_SHADER,
            uniforms: {
              tMap: { value: texture },
              uPlaneSizes: { value: [0, 0] },
              uImageSizes: {
                value: [imageObj.naturalWidth, imageObj.naturalHeight],
              },
              uViewportSizes: {
                value: [viewportRef.current.width, viewportRef.current.height],
              },
              uStrength: { value: 0 },
            },
            transparent: true,
            depthTest: false,
            depthWrite: false,
          });

          const mesh = new Mesh(gl, {
            geometry: webglRef.current.geometry,
            program,
          });

          mesh.setParent(webglRef.current.scene);

          return {
            element: element as HTMLElement,
            mesh,
            program,
            bounds: null,
            extra: 0,
          };
        } catch (err) {
          console.error(`Erreur lors du chargement de l'image ${index}:`, err);
          return null;
        }
      };

      const mediaPromises = Array.from(mediaElements).map((element, index) =>
        createSingleMedia(element, index)
      );

      mediasRef.current = (await Promise.all(mediaPromises)).filter(
        Boolean
      ) as MediaItem[];

      if (mediasRef.current.length > 0) {
        updateMediaBounds();
        setLoaded(true);
      }
    } catch (err) {
      handleWebGLError("Erreur lors de la création des médias", err);
    }
  }, [gallerySelector, updateMediaBounds, handleWebGLError]);

  // Initialisation WebGL
  const initWebGL = useCallback(async () => {
    if (!canvasRef.current || !oglModulesRef.current) return;

    try {
      const { Renderer, Camera, Transform, Plane } = oglModulesRef.current;

      webglRef.current.renderer = new Renderer({
        alpha: true,
        antialias: true,
        canvas: canvasRef.current,
        premultipliedAlpha: false,
      });

      webglRef.current.gl = webglRef.current.renderer.gl;

      if (canvasRef.current) {
        canvasRef.current.style.pointerEvents = "auto";
        canvasRef.current.style.cursor = "pointer";
      }

      if (!webglRef.current.gl) {
        throw new Error("Impossible d'obtenir le contexte WebGL");
      }

      webglRef.current.gl.enable(webglRef.current.gl.DEPTH_TEST);
      webglRef.current.camera = new Camera(webglRef.current.gl);
      webglRef.current.camera.fov = 45;
      webglRef.current.camera.position.z = 5;
      webglRef.current.scene = new Transform();
      webglRef.current.geometry = new Plane(webglRef.current.gl, {
        heightSegments: 10,
        widthSegments: 10,
      });

      handleResize();

      // Créer les médias de manière asynchrone
      await createMedias();

      // Démarrer l'animation une fois tout chargé
      animationId.current = requestAnimationFrame(update);
    } catch (err) {
      handleWebGLError("Erreur lors de l'initialisation de WebGL", err);
    }
  }, [canvasRef, createMedias, handleResize, update, handleWebGLError]);

  // Effets
  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        const oglModule = await import("ogl");

        if (!isMounted) return;

        oglModulesRef.current = {
          Renderer: oglModule.Renderer,
          Camera: oglModule.Camera,
          Transform: oglModule.Transform,
          Plane: oglModule.Plane,
          Mesh: oglModule.Mesh,
          Program: oglModule.Program,
          Texture: oglModule.Texture,
        };

        await initWebGL();
      } catch (err) {
        if (isMounted) {
          handleWebGLError("Erreur lors du chargement des modules OGL", err);
        }
      }
    };

    initialize();

    return () => {
      isMounted = false;
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
        animationId.current = null;
      }
    };
  }, [initWebGL, handleWebGLError]);

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;

    canvasRef.current.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("click", handleClick);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    loaded,
    canvasRef,
    handleClick,
    handleResize,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Nettoyage au démontage
  useEffect(() => {
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  // Référence galerie
  const setGalleryRef = useCallback((element: HTMLDivElement) => {
    galleryRef.current = element;
  }, []);

  // Return les fonctionnalités et états
  return {
    loaded,
    error,
    setGalleryRef,
    activeIndex,
  };
}
