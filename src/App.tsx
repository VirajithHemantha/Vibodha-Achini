import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, ChevronDown, Volume2, VolumeX, X, Hotel } from "lucide-react";

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Naween & Nadeesha
 * Background: Cream/Sand
 * Accents: Green/Brown
 */

const brideGroomImage = "/images/couple_aa.png";
const backgroundMusic = "/bg_music.mp3";
const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL?.trim() || "";

/** iOS / Android block unmuted autoplay; iPadOS may report as MacIntel. */
function isLikelyMobileOrTablet() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  return false;
}

function FloatingPetals() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      x: number;
      size: number;
      rotation: number;
      duration: number;
      delay: number;
      color: string;
      drift: number;
    }>
  >([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#fdf5eb", "#f9ede0", "#f0e1cf", "#fefaf6"];
    const petalCount = isMobile ? 10 : 18;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""
        }`}
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(227,207,172,0.4)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const targetDate = new Date("May 09, 2026 17:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2 lg:content-visibility-auto">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          <div className="relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-white rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] border border-theme-100/60 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-theme-300/50 rounded-t-full pointer-events-none" />

            <span className="text-2xl sm:text-3xl md:text-5xl font-playball text-theme-800 leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, "0")}
            </span>

            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-stone-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-theme-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** Preload critical assets */
const criticalAssets = ["/theme_hero.png", "/images/couple_aa.png", "/floral_corner_theme.png", "/monogram_aa.png"];
function preloadAssets() {
  criticalAssets.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function AccommodationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const honeymoonRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 38,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 36,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 33,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
  ];

  const doubleRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 26,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 24,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 21,000.00", view: "Jungle View" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#fcfcf0]">
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl text-[#c5a059] font-bold">Accommodation Rates</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#87937a] mt-1">Kithul Kanda Mountain Resort</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#fcfcf0]/30">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#c5a059]/30" />
                <h3 className="font-playball text-3xl text-[#c5a059]">Honeymoon Room Rates</h3>
                <div className="h-px flex-1 bg-[#c5a059]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {honeymoonRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#ccbaa2]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#87937a] mb-4 border-b border-[#ccbaa2]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#c5a059] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#87937a]/5 p-8 rounded-2xl border border-[#87937a]/10">
              <h3 className="font-cinzel text-sm font-bold text-[#87937a] mb-6 uppercase tracking-widest text-center">Honeymoon Package Includes</h3>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { icon: "🍾🍷", label: "Bottle of Wine" },
                  { icon: "🛌🏻🎊", label: "Bed decoration" },
                  { icon: "🕯️🍽️", label: "Candlelight Dinner" },
                  { icon: "👩❤️👨🏞️", label: "Photo Location" },
                  { icon: "🍪🧇", label: "Cookies Plate" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 text-center p-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[10px] font-bold text-[#87937a] uppercase tracking-tighter leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#c5a059]/30" />
                <h3 className="font-playball text-3xl text-[#c5a059]">Double Room Rates</h3>
                <div className="h-px flex-1 bg-[#c5a059]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {doubleRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#ccbaa2]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#87937a] mb-4 border-b border-[#ccbaa2]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#c5a059] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check In</p>
                <p className="font-cinzel text-xl text-[#87937a]">2:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check Out</p>
                <p className="font-cinzel text-xl text-[#87937a]">12:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Availability</p>
                <p className="font-cinzel text-sm text-[#87937a] leading-tight">Max 16 Rooms Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-50 flex justify-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] italic font-medium">Please contact the resort or couple for bookings</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);

  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    place: "",
    attending: "yes",
    guests: "1",
  });

  // --- Personalization Logic ---
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(to.replace(/_/g, " ")); // Replace underscores with spaces for cleaner URLs
    }
  }, []);
  // -----------------------------

  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });

  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [introMuted, setIntroMuted] = useState(true);
  const [introPlayBlocked, setIntroPlayBlocked] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [musicAudible, setMusicAudible] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const introBootstrappedRef = useRef(false);
  const hasStartedMusicRef = useRef(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = false;
      audio.volume = 1;
      await audio.play();
      hasStartedMusicRef.current = true;
      setAudioUnlocked(true);
      setMusicAudible(true);
      return true;
    } catch {
      return false;
    }
  }, []);

  const playMutedMusicFallback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = true;
      audio.volume = 1;
      await audio.play();
      setMusicAudible(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  const unlockAudioFromGesture = useCallback(async () => {
    if (audioUnlocked) return;

    const ok = await playMusic();

    if (!ok) {
      await playMutedMusicFallback();
    }

    const video = introVideoRef.current;
    if (video && !isOpened) {
      try {
        video.muted = false;
        setIntroMuted(false);
        await video.play();
      } catch {
        // ignore
      }
    }
  }, [audioUnlocked, isOpened, playMusic, playMutedMusicFallback]);

  const handleSoundToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    void unlockAudioFromGesture();

    const wantOn = audio.muted || audio.paused;
    if (wantOn) {
      audio.muted = false;
      void audio.play().then(
        () => setMusicAudible(true),
        () => { },
      );
    } else {
      audio.muted = true;
      setMusicAudible(false);
    }
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    const handler = () => {
      void unlockAudioFromGesture();
    };

    document.addEventListener("pointerdown", handler, { capture: true, passive: true });
    document.addEventListener("touchstart", handler, { capture: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [unlockAudioFromGesture]);

  const introVideoRefCallback = useCallback((node: HTMLVideoElement | null) => {
    introVideoRef.current = node;
    if (node) introBootstrappedRef.current = false;
  }, []);

  const bootstrapIntroPlayback = useCallback(async (video: HTMLVideoElement) => {
    if (introBootstrappedRef.current) return;
    introBootstrappedRef.current = true;

    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.playsInline = true;
    video.currentTime = 0;

    const mobile = isLikelyMobileOrTablet();

    video.muted = true;
    setIntroMuted(true);

    try {
      await video.play();
      setIntroPlayBlocked(false);

      if (!mobile) {
        try {
          video.muted = false;
          setIntroMuted(false);
          await video.play();
        } catch {
          // ignore desktop unmute failure
        }
      }

      if (!mobile && !hasStartedMusicRef.current) {
        const ok = await playMusic();
        if (!ok) {
          await playMutedMusicFallback();
        }
      }
    } catch {
      introBootstrappedRef.current = false;
      setIntroPlayBlocked(true);
    }
  }, [playMusic, playMutedMusicFallback]);

  const handleTapToPlayIntro = useCallback(async () => {
    const video = introVideoRef.current;
    if (!video) return;

    introBootstrappedRef.current = true;
    video.currentTime = 0;
    video.muted = false;
    setIntroMuted(false);
    setIntroPlayBlocked(false);

    try {
      await video.play();
    } catch {
      // ignore
    }

    await unlockAudioFromGesture();
  }, [unlockAudioFromGesture]);

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Missing VITE_GOOGLE_SCRIPT_URL");
    }

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: new URLSearchParams(payload),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        name: rsvpForm.name.trim(),
        place: rsvpForm.place.trim(),
        attending: rsvpForm.attending,
        guests: rsvpForm.attending === "yes" ? rsvpForm.guests : "0",
        dietaryNotes: "",
      });
      setRsvpStatus("success");
      setRsvpForm({ name: "", place: "", attending: "yes", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });
      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

  return (
    <main
      className={`h-[100dvh] w-full bg-[#fdfaf5] transition-all duration-1000 ${isOpened
        ? "overflow-y-auto overflow-x-hidden"
        : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[100] bg-[#f8f6f2] flex items-center justify-center overflow-hidden touch-manipulation"
            onPointerDownCapture={() => {
              void unlockAudioFromGesture();
            }}
            onTouchStartCapture={() => {
              void unlockAudioFromGesture();
            }}
          >
            <video
              ref={introVideoRefCallback}
              src="/intro_video.mp4"
              autoPlay
              muted={introMuted}
              playsInline
              preload="auto"
              className="w-full h-full min-h-0 object-cover pointer-events-auto"
              onLoadedData={(e) => {
                void bootstrapIntroPlayback(e.currentTarget);
                preloadAssets(); // Start preloading images while video plays
              }}
              onCanPlay={(e) => {
                void bootstrapIntroPlayback(e.currentTarget);
              }}
              onEnded={() => {
                setIsOpened(true);
              }}
              onError={() => setIsOpened(true)}
            />

            {introPlayBlocked && (
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  void handleTapToPlayIntro();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    void handleTapToPlayIntro();
                  }
                }}
                className="absolute inset-0 z-[105] flex flex-col items-center justify-center gap-3 bg-black/35 px-6 text-center text-white backdrop-blur-[2px] touch-manipulation"
              >
                <span className="font-cinzel text-sm uppercase tracking-[0.35em]">Tap anywhere</span>
                <span className="max-w-xs text-[11px] font-montserrat leading-relaxed text-white/85">
                  Your browser needs one tap to start video and music.
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                void unlockAudioFromGesture();
                setIsOpened(true);
              }}
              className="absolute bottom-10 right-10 z-[110] px-6 py-2 bg-white/20 backdrop-blur-md text-white text-xs uppercase tracking-widest rounded-full border border-white/30 hover:bg-white/40 transition-all font-bold touch-manipulation"
            >
              Skip Video
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
            onPointerDownCapture={() => {
              void unlockAudioFromGesture();
            }}
            onTouchStartCapture={() => {
              void unlockAudioFromGesture();
            }}
          >
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            <section className="w-full relative flex flex-col bg-white overflow-hidden">
              <picture className="w-full flex items-start">
                <source
                  media="(max-width: 768px)"
                  srcSet="/theme_hero.png"
                />
                <img
                  src="/theme_hero.png"
                  alt="Wedding Invitation Hero"
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-screen object-cover object-center"
                />
              </picture>
            </section>

            <section className="relative pt-12 md:pt-20 pb-24 md:pb-32 w-full flex flex-col items-center bg-[#ccbaa2]/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 md:w-64 opacity-80 z-20 pointer-events-none">
                <img src="/floral_corner_theme.png" alt="" className="w-full h-auto" />
              </div>
              <div className="absolute top-0 right-0 w-32 md:w-64 opacity-80 z-20 pointer-events-none scale-x-[-1]">
                <img src="/floral_corner_theme.png" alt="" className="w-full h-auto" />
              </div>
              <div className="absolute bottom-0 left-0 w-32 md:w-64 opacity-80 z-20 pointer-events-none scale-y-[-1]">
                <img src="/floral_corner_theme.png" alt="" className="w-full h-auto" />
              </div>
              <div className="absolute bottom-0 right-0 w-32 md:w-64 opacity-80 z-20 pointer-events-none scale-x-[-1] scale-y-[-1]">
                <img src="/floral_corner_theme.png" alt="" className="w-full h-auto" />
              </div>

              <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
              <div className="absolute inset-4 md:inset-8 border-[1.5px] border-[#87937a]/30 pointer-events-none z-10" />
              <div className="absolute inset-5 md:inset-10 border-[0.5px] border-[#c1b199]/20 pointer-events-none z-10" />

              <div className="max-w-[1100px] w-full flex flex-col items-center text-center relative z-20 px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-16"
                >
                  <div className="mb-6 w-32 md:w-48 opacity-90 select-none">
                    <img src="/monogram_aa.png" alt="AA" className="w-full h-auto mix-blend-multiply" />
                  </div>
                  <p className="text-[#87937a] text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold text-center leading-loose max-w-2xl">
                    TOGETHER WITH THEIR FAMILIES
                    <br />
                    we joyfully invite you to
                    <br />
                    CELEBRATE THE WEDDING OF
                    <span className="text-[#c5a059] font-playball text-2xl md:text-3xl block my-2 lowercase first-letter:uppercase">
                      {guestName || "Mr. & Mrs./Miss/Family"}
                    </span>
                    <br className="hidden md:block" />
                  </p>
                </motion.div>

                <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 my-12 mb-24">
                  <motion.div
                    initial={{ opacity: 0, x: -40, rotate: -3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                    viewport={{ once: true }}
                    className="relative z-10 w-[280px] h-[340px] md:w-[350px] md:h-[450px] bg-white p-4 shadow-[0_20px_50px_rgba(135,147,122,0.15)] border border-[#ccbaa2]/40 rotate-[-3deg] md:-mr-16"
                  >
                    <div className="w-full h-full overflow-hidden border border-[#ccbaa2]/20">
                      <img
                        src={brideGroomImage}
                        alt="Wedding"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 40, y: 40 }}
                    whileInView={{ opacity: 1, x: 0, y: 20 }}
                    viewport={{ once: true }}
                    className="relative z-20 w-full max-w-[450px] bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(135,147,122,0.2)] border border-[#ccbaa2]/50 flex flex-col items-center justify-center text-center"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#c5a059]/30 pointer-events-none" />

                    <div className="space-y-2 mb-8">
                      <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-[#87937a]/60">
                        Loving daughter of
                      </p>
                      <p className="text-[11px] font-cinzel text-[#87937a] tracking-wider">
                        THE FAMILY OF
                        <br />& THE LATE PARENTS
                      </p>
                      <h3 className="text-4xl md:text-6xl font-playball text-[#c5a059] pt-4 leading-none">
                        Ama
                      </h3>
                    </div>

                    <div className="py-6 flex items-center justify-center w-full">
                      <div className="h-px w-full bg-[#ccbaa2]/30" />
                      <span className="px-6 font-playball text-4xl text-[#c5a059] italic">&</span>
                      <div className="h-px w-full bg-[#ccbaa2]/30" />
                    </div>

                    <div className="space-y-2 mt-8">
                      <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-[#87937a]/60">
                        Loving son of
                      </p>
                      <p className="text-[11px] font-cinzel text-[#87937a] tracking-wider">
                        THE FAMILY OF
                        <br />& THE LATE PARENTS
                      </p>
                      <h3 className="text-4xl md:text-6xl font-playball text-[#c5a059] pt-4 leading-none">
                        Anjana
                      </h3>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="w-full overflow-hidden leading-[0]"
            >
              <img
                src="/detail_rings.png"
                alt="Wedding Ring Details"
                loading="lazy"
                className="w-full h-auto block"
              />
            </motion.div>

            <section className="relative py-24 md:py-36 bg-[#87937a]/5 flex flex-col items-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ccbaa2] blur-[120px] rounded-full opacity-20" />

              <div className="w-full max-w-[1000px] px-6 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative mb-16"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[15vw] md:text-[180px] text-[#87937a]/5 whitespace-nowrap pointer-events-none select-none">
                    Eternity
                  </div>
                  <h2 className="font-cinzel text-3xl md:text-5xl text-[#c5a059] tracking-[0.2em] md:tracking-[0.3em] font-bold relative z-10 uppercase">
                    SAVE <span className="mx-4 text-[#87937a]">THE</span> DATE
                  </h2>
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <div className="h-[0.5px] w-12 bg-[#ccbaa2]" />
                    <span className="font-playball text-4xl text-[#87937a]">Wait for the magic</span>
                    <div className="h-[0.5px] w-12 bg-[#ccbaa2]" />
                  </div>
                </motion.div>

                <CountdownTimer />

                <p className="mt-16 text-[9px] uppercase tracking-[0.6em] text-[#87937a] font-bold opacity-60">
                  Counting down to our special day
                </p>
              </div>
            </section>

            <section className="relative py-24 md:py-36 bg-white overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-[1px] bg-[#87937a]" />
                        <span className="text-[#87937a] font-bold uppercase tracking-[0.4em] text-[10px]">
                          T H E · V E N U E
                        </span>
                      </div>
                      <h2 className="font-cinzel text-[2.5rem] md:text-[4rem] text-[#c5a059] leading-tight tracking-widest font-bold uppercase">
                        Kithul Kanda
                      </h2>
                      <p className="font-playball text-3xl md:text-5xl text-[#87937a] italic mt-2">
                        MOUNTAIN RESORT
                      </p>
                    </div>

                    <div className="space-y-8 pl-6 border-l border-[#ccbaa2]/40">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-[#87937a] mt-1 shrink-0" />
                        <p className="text-lg md:text-xl text-[#87937a] font-cinzel leading-relaxed tracking-wide">
                          Kithul Kanda Mountain Resort, Padukka.
                        </p>
                      </div>
                      <p className="text-[#87937a]/70 text-sm md:text-base tracking-widest uppercase font-light leading-loose">
                        We look forward to welcoming you to this beautiful resort to celebrate our
                        special day. Reception to follow LOVE LAUGHTER FOREVER.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() =>
                          window.open("https://maps.app.goo.gl/r5yvS6W3b7x3pYvB9", "_blank")
                        }
                        className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#87937a] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-[#7a866d]"
                      >
                        <MapPin className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                        Get Directions
                      </button>

                      <button
                        onClick={() => setIsAccommodationOpen(true)}
                        className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-white text-[#87937a] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] border-2 border-[#87937a] overflow-hidden transition-all hover:bg-[#87937a]/5"
                      >
                        <Hotel className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                        Room Rates
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-[3/4] max-w-[450px] mx-auto bg-white p-3 shadow-[0_40px_80px_-20px_rgba(135,147,122,0.2)] border border-[#ccbaa2]/50"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#c5a059]/30 pointer-events-none z-20" />
                    <div className="w-full h-full overflow-hidden bg-white relative">
                      <iframe
                        src="https://maps.google.com/maps?q=Kithul%20Kanda%20Mountain%20Resort,%20Padukka&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.8] contrast-110 sepia-[0.3] opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="relative py-32 md:py-48 bg-[#f8f6f2] flex flex-col items-center overflow-hidden">
              <div className="absolute top-0 left-0 w-32 md:w-48 opacity-40 pointer-events-none">
                <img src="/floral_corner_theme.png" alt="" className="w-full h-auto" />
              </div>
              <div className="absolute bottom-0 right-0 w-32 md:w-48 opacity-40 pointer-events-none scale-x-[-1] scale-y-[-1]">
                <img src="/floral_corner_theme.png" alt="" className="w-full h-auto" />
              </div>
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-cinzel text-2xl md:text-4xl text-slate-800 tracking-[0.3em] mb-12 uppercase text-center"
                >
                  FOR OUR BIG DAY
                </motion.h2>

                <div className="relative w-full max-w-[550px] aspect-[4/5] flex items-center justify-center pt-12 md:pt-24 mt-12 md:mt-0">
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/images/11.png"
                      alt="Envelope"
                      className="w-full h-full object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 70, scale: 0.7 }}
                    whileInView={{ opacity: 1, y: 0, scale: 0.85 }}
                    transition={{ delay: 0.6, duration: 2.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="absolute -top-32 md:-top-56 left-1/2 -translate-x-1/2 w-[100%] md:w-[120%] h-64 md:h-[320px] pointer-events-none z-0"
                  >
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-sm opacity-90"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-x-[-1] -rotate-12 translate-x-12 opacity-80"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom rotate-[15deg] -translate-x-12 opacity-70"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-75 translate-y-12 opacity-60"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative z-10 w-[94%] md:w-[88%] bg-white shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col items-center pt-8 md:pt-12"
                  >
                    <div className="w-full border border-slate-300 rounded-[1.5rem] p-6 md:p-8 flex flex-col items-center mt-2 relative z-10">
                      <h3 className="font-playball text-2xl md:text-4xl text-slate-800 mb-8 text-center">
                        RSVP Confirmation
                      </h3>

                      <form className="w-full space-y-6 text-left" onSubmit={handleRsvpSubmit}>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Your Name</label>
                          <input
                            type="text"
                            placeholder="Type your name here..."
                            value={rsvpForm.name}
                            onChange={(e) => {
                              setRsvpStatus("idle");
                              setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all font-cinzel text-base"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Your Place</label>
                          <input
                            type="text"
                            placeholder="City / Area Name..."
                            value={rsvpForm.place}
                            onChange={(e) => {
                              setRsvpStatus("idle");
                              setRsvpForm((prev) => ({ ...prev, place: e.target.value }));
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all font-cinzel text-base"
                            required
                          />
                        </div>

                        <div className="space-y-4 pt-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">
                            Will you join us on our big day?
                          </label>

                          <div className="flex flex-col gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                setRsvpStatus("idle");
                                setRsvpForm((prev) => ({ ...prev, attending: "yes" }));
                              }}
                              className={`w-full py-4 md:py-5 rounded-xl font-cinzel text-[11px] md:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center px-4 leading-relaxed active:scale-[0.98] ${rsvpForm.attending === "yes"
                                ? "bg-[#708da9] text-white shadow-md"
                                : "bg-[#f3f3f3] text-slate-700 hover:bg-slate-200"
                                }`}
                            >
                              Yes, I&apos;ll be there!
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setRsvpStatus("idle");
                                setRsvpForm((prev) => ({ ...prev, attending: "no" }));
                              }}
                              className={`w-full py-4 md:py-5 rounded-xl font-cinzel text-[11px] md:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center px-4 leading-relaxed active:scale-[0.98] ${rsvpForm.attending === "no"
                                ? "bg-[#708da9] text-white shadow-md"
                                : "bg-[#f3f3f3] text-slate-700 hover:bg-slate-200"
                                }`}
                            >
                              Sadly I can&apos;t attend
                            </button>
                          </div>
                        </div>

                        {rsvpForm.attending === "yes" && (
                          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                            <label className="text-xs font-bold text-slate-500 ml-1">
                              Number of Guests
                            </label>
                            <div className="relative">
                              <select
                                value={rsvpForm.guests}
                                onChange={(e) => {
                                  setRsvpStatus("idle");
                                  setRsvpForm((prev) => ({ ...prev, guests: e.target.value }));
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all font-cinzel text-base appearance-none cursor-pointer"
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num.toString()}>
                                    {num} {num === 1 ? "Guest" : "Guests"}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <ChevronDown size={16} />
                              </div>
                            </div>
                          </div>
                        )}

                        {(rsvpStatus === "success" || rsvpStatus === "error") && (
                          <p
                            className={`text-[10px] text-center font-semibold ${rsvpStatus === "success" ? "text-emerald-600" : "text-red-500"
                              }`}
                          >
                            {rsvpStatus === "success"
                              ? "RSVP sent successfully."
                              : "Please enter your name and try again."}
                          </p>
                        )}

                        <div className="pt-6">
                          <button
                            type="submit"
                            disabled={rsvpStatus === "sending"}
                            className="w-full bg-[#708da9] text-white py-4 md:py-5 rounded-xl font-cinzel text-xs md:text-sm tracking-[0.2em] font-bold hover:bg-[#5d7d9a] transition-all shadow-md uppercase disabled:opacity-70"
                          >
                            {rsvpStatus === "sending" ? "SENDING..." : "CLICK HERE TO CONFIRM"}
                          </button>
                          <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed">
                            No shared details will be public. Your response is private.
                          </p>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>

            <div className="relative bg-[#ccbaa2]/10">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <section className="relative py-24 md:py-36 flex flex-col items-center overflow-hidden">
                <div className="absolute top-0 right-0 w-32 md:w-64 opacity-50 pointer-events-none scale-x-[-1]">
                  <img src="/floral_corner_theme.png" alt="" className="w-full h-auto" />
                </div>
                <div className="absolute bottom-0 left-0 w-32 md:w-64 opacity-50 pointer-events-none scale-y-[-1]">
                  <img src="/floral_corner_theme.png" alt="" className="w-full h-auto" />
                </div>
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#87937a]/10 mb-8 mt-4 shadow-sm border border-[#87937a]/20">
                      <Sparkles className="w-8 h-8 text-[#87937a]" />
                    </div>

                    <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-[#c5a059] mb-6 drop-shadow-sm leading-none">
                      Best Wishes
                    </h2>
                    <div className="h-px w-24 bg-[#ccbaa2] mb-8" />

                    <p className="text-[#87937a] text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-light tracking-[0.1em] px-4 uppercase">
                      Your presence at our wedding is the greatest gift of all. However, if you
                      wish to honor us with a message, we would be delighted to read it!
                    </p>

                    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(135,147,122,0.1)] border border-[#ccbaa2]/50 relative group">
                      <div className="absolute inset-2 border-[0.5px] border-[#c5a059]/20 pointer-events-none transition-colors duration-700" />

                      <form className="space-y-12 text-left relative z-10" onSubmit={handleWishSubmit}>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#87937a]/40">
                            From
                          </label>
                          <input
                            type="text"
                            placeholder="YOUR NAME"
                            value={wishForm.name}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#ccbaa2]/40 px-0 py-4 text-[#87937a] placeholder:text-[#ccbaa2]/30 focus:outline-none focus:border-[#c5a059] transition-all font-cinzel text-lg tracking-widest"
                            required
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#87937a]/40">
                            Message
                          </label>
                          <textarea
                            rows={4}
                            placeholder="WISHES..."
                            value={wishForm.message}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, message: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#ccbaa2]/40 px-0 py-4 text-[#87937a] placeholder:text-[#ccbaa2]/30 focus:outline-none focus:border-[#c5a059] transition-all font-cinzel text-lg tracking-widest resize-none"
                            required
                          />
                        </div>
                        {(wishStatus === "success" || wishStatus === "error") && (
                          <p
                            className={`text-[10px] text-center font-semibold ${wishStatus === "success" ? "text-emerald-700" : "text-red-500"
                              }`}
                          >
                            {wishStatus === "success"
                              ? "Wish sent successfully."
                              : "Please enter your name and wish."}
                          </p>
                        )}
                        <div className="pt-6 flex justify-center">
                          <button
                            type="submit"
                            disabled={wishStatus === "sending"}
                            className="bg-[#87937a] text-white px-12 py-5 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-[#7a866d] transition-all duration-300 shadow-md disabled:opacity-70"
                          >
                            {wishStatus === "sending" ? "Sending..." : "Send Wishes"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </section>

              <footer className="py-24 md:py-40 flex flex-col items-center text-center relative z-10 px-6">
                <div className="h-px w-24 bg-[#ccbaa2] mb-16 opacity-50" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <p className="font-playball text-5xl md:text-7xl text-[#c5a059] leading-tight">
                    With Love,
                  </p>
                  <h2 className="font-cinzel text-2xl md:text-4xl text-[#87937a] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold">
                    AMA <span className="mx-2 md:mx-4 opacity-40 font-light">&</span> ANJANA
                  </h2>
                </motion.div>

                <div className="mt-24 md:mt-36 pt-12 border-t border-[#ccbaa2]/20 w-full max-w-sm">
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] text-[#87937a]/50 font-bold leading-loose">
                    © 2026 Ama & Anjana
                    <br className="md:hidden" />
                    <span className="hidden md:inline mx-4">|</span>
                    All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={backgroundMusic}
        loop
        preload="auto"
        playsInline
        className="sr-only"
        aria-hidden
      />

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={() => handleSoundToggle()}
        aria-pressed={musicAudible}
        aria-label={musicAudible ? "Mute background music" : "Unmute background music"}
        className="fixed bottom-6 left-6 z-[120] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#c5a059] bg-white/95 text-[#87937a] shadow-[0_0_0_4px_rgba(197,160,89,0.2),0_10px_36px_-6px_rgba(135,147,122,0.45)] backdrop-blur-md touch-manipulation transition-[transform,box-shadow] hover:scale-[1.05] hover:shadow-[0_0_0_5px_rgba(197,160,89,0.28),0_14px_44px_-6px_rgba(135,147,122,0.5)] active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfaf5]"
      >
        {musicAudible ? <Volume2 className="h-6 w-6" strokeWidth={2} /> : <VolumeX className="h-6 w-6" strokeWidth={2} />}
      </motion.button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #ccbaa233;
        }
        ::-webkit-scrollbar-thumb {
          background: #87937a66;
          border-radius: 10px;
        }
      `,
        }}
      />
      <AdminPanel />
      <AnimatePresence>
        {isAccommodationOpen && (
          <AccommodationModal
            isOpen={isAccommodationOpen}
            onClose={() => setIsAccommodationOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function AdminPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("Mr. & Mrs.");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState(window.location.origin);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setIsVisible(true);
    }
  }, []);

  const generateLink = () => {
    const fullName = prefix === "None" ? name : `${prefix} ${name}`;
    const urlSafeName = fullName.trim().replace(/\s+/g, "_");
    const link = `${baseUrl}?to=${urlSafeName}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 z-[200] max-w-sm w-full bg-white/90 backdrop-blur-xl border border-theme-200 rounded-2xl shadow-2xl p-6 font-montserrat animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-cinzel font-bold text-theme-800 text-sm tracking-widest uppercase">
          Invitation Manager
        </h2>
        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-stone-600 transition-colors"
        >
          <VolumeX className="w-4 h-4 rotate-45" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Base Hosted Link
          </label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://your-wedding-site.com"
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Prefix
          </label>
          <select
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          >
            <option>Mr. & Mrs.</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss</option>
            <option>Family</option>
            <option>Dear</option>
            <option>None</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Guest Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          />
        </div>

        <button
          onClick={generateLink}
          className="w-full bg-[#87937a] text-white py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-[#7a866d] transition-all"
        >
          Generate Personalized Link
        </button>

        {generatedLink && (
          <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-100 flex flex-col gap-2">
            <p className="text-[9px] text-stone-500 break-all font-mono">{generatedLink}</p>
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 bg-theme-100 text-theme-800 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-theme-200 transition-all"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-[9px] text-stone-400 leading-relaxed">
        Tip: Add <span className="font-bold">?admin=true</span> to any URL to open this menu again.
      </p>
    </div>
  );
}
