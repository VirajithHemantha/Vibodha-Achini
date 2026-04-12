import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, ChevronDown, Volume2, VolumeX, X, Hotel, MailOpen } from "lucide-react";
import EnvelopeOpener from "./components/EnvelopeOpener";

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
    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-12 z-20 px-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          <div className="relative w-[5.5rem] h-[5.5rem] sm:w-24 sm:h-24 md:w-32 md:h-32 bg-[#fdfaf5] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-[#d4af37]/30 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(212,175,55,0.3)]">
            {/* Inner elegant border */}
            <div className="absolute inset-1.5 md:inset-2 border-[0.5px] border-[#d4af37]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-marble.png')] opacity-40 pointer-events-none" />

            <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-800 leading-none relative z-10 transition-transform duration-500 group-hover:scale-105">
              {Math.max(0, stat.value).toString().padStart(2, "0")}
            </span>

            <div className="w-full flex justify-center mt-3 relative z-10">
              <span className="text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-500 font-medium">
                {stat.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** Preload critical assets */
const criticalAssets = ["/monogram_aa.png"];
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
            <h2 className="font-cinzel text-xl md:text-2xl text-[#059669] font-bold">Accommodation Rates</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#047857] mt-1">Kithul Kanda Mountain Resort</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#fcfcf0]/30">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#059669]/30" />
                <h3 className="font-playball text-3xl text-[#059669]">Honeymoon Room Rates</h3>
                <div className="h-px flex-1 bg-[#059669]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {honeymoonRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#34d399]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#047857] mb-4 border-b border-[#34d399]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#059669] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#047857]/5 p-8 rounded-2xl border border-[#047857]/10">
              <h3 className="font-cinzel text-sm font-bold text-[#047857] mb-6 uppercase tracking-widest text-center">Honeymoon Package Includes</h3>
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
                    <span className="text-[10px] font-bold text-[#047857] uppercase tracking-tighter leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#059669]/30" />
                <h3 className="font-playball text-3xl text-[#059669]">Double Room Rates</h3>
                <div className="h-px flex-1 bg-[#059669]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {doubleRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#34d399]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#047857] mb-4 border-b border-[#34d399]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#059669] whitespace-nowrap">{room.rate}</p>
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
                <p className="font-cinzel text-xl text-[#047857]">2:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check Out</p>
                <p className="font-cinzel text-xl text-[#047857]">12:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Availability</p>
                <p className="font-cinzel text-sm text-[#047857] leading-tight">Max 16 Rooms Available</p>
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

  const [musicAudible, setMusicAudible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUnlockedRef = useRef(false);
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
    if (audioUnlockedRef.current) return;

    const ok = await playMusic();

    if (!ok) {
      await playMutedMusicFallback();
    }
  }, [playMusic, playMutedMusicFallback]);

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

  useEffect(() => {
    if (isOpened) {
      preloadAssets();
    }
  }, [isOpened]);

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
            key="envelope-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[100] bg-[#f8f6f2] flex items-center justify-center overflow-hidden touch-manipulation"
          >
            <EnvelopeOpener onOpen={() => {
              setIsOpened(true);
              void unlockAudioFromGesture();
            }} />
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

            <section className="w-full h-screen relative flex flex-col items-center justify-center overflow-hidden bg-marble-emerald px-6 py-12 md:p-16 z-10">
              {/* Add a subtle dark vignette to enhance the premium depth */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-0"></div>

              {/* Premium Gold Frame */}
              <div className="absolute inset-3 md:inset-5 border border-[#d4af37]/20 pointer-events-none z-10 rounded-sm"></div>
              <div className="absolute inset-4 md:inset-6 border-[1.5px] border-[#d4af37]/40 pointer-events-none z-10 rounded-sm shadow-[inset_0_0_20px_rgba(212,175,55,0.1)]"></div>
              <div className="absolute top-8 left-8 w-12 h-12 md:w-16 md:h-16 border-t-[3px] border-l-[3px] border-[#d4af37] pointer-events-none z-10 opacity-70 drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]"></div>
              <div className="absolute top-8 right-8 w-12 h-12 md:w-16 md:h-16 border-t-[3px] border-r-[3px] border-[#d4af37] pointer-events-none z-10 opacity-70 drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 md:w-16 md:h-16 border-b-[3px] border-l-[3px] border-[#d4af37] pointer-events-none z-10 opacity-70 drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 md:w-16 md:h-16 border-b-[3px] border-r-[3px] border-[#d4af37] pointer-events-none z-10 opacity-70 drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]"></div>

              <div className="w-full max-w-2xl relative z-20 flex flex-col items-center justify-center text-center mt-[-4vh]">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  className="space-y-6 md:space-y-8 flex flex-col items-center w-full"
                >
                  <div className="w-20 md:w-28 opacity-70 mb-2 md:mb-4 select-none">
                    <img src="/monogram_aa.png" alt="AA" className="w-full h-auto brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                  </div>

                  <p className="font-montserrat text-[9px] md:text-[11px] tracking-[0.4em] text-[#f7e7ce] uppercase font-medium drop-shadow-md">
                    Together with their families
                  </p>
                  
                  <div className="space-y-2 md:space-y-4 pt-2">
                    <h1 className="font-alex text-7xl md:text-[8.5rem] text-gold-gradient leading-[0.8] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] select-none py-2">
                      Ama
                    </h1>
                    
                    <div className="flex items-center justify-center gap-4">
                       <p className="font-serif text-xl md:text-2xl text-[#d4af37] italic opacity-80 drop-shadow-md">and</p>
                    </div>
                    
                    <h1 className="font-alex text-7xl md:text-[8.5rem] text-gold-gradient leading-[0.8] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] select-none py-2">
                      Anjana
                    </h1>
                  </div>

                  <div className="space-y-6 pt-6 md:pt-10">
                    <p className="font-montserrat text-[9px] md:text-[11px] tracking-[0.3em] text-[#f7e7ce] uppercase leading-relaxed font-medium drop-shadow-md">
                      Request the honor of your presence<br/>at their wedding
                    </p>
                    
                    <div className="flex flex-col items-center gap-3">
                      <p className="font-serif text-lg md:text-2xl text-white tracking-widest font-bold italic drop-shadow-md">
                        Saturday, May 09, 2026
                      </p>
                      <p className="font-serif text-[13px] md:text-[16px] text-[#f7e7ce]/90 italic drop-shadow-md">
                        at three o'clock in the afternoon
                      </p>
                    </div>
                    
                    <div className="pt-4 flex flex-col items-center gap-2">
                      <div className="h-[0.5px] w-16 bg-[#d4af37]/60 mb-2 shadow-[0_0_5px_rgba(212,175,55,0.4)]"></div>
                      <p className="font-montserrat text-[9px] md:text-[11px] tracking-[0.2em] text-[#fdfaf5] uppercase text-center font-medium leading-loose drop-shadow-md">
                        WEDDING VENUE<br/>
                        KITHUL KANDA MOUNTAIN RESORT<br/>
                        MEEGODA, SL
                      </p>
                      <p className="font-serif text-[12px] md:text-[14px] text-[#d4af37] italic mt-2 font-bold drop-shadow-md">
                        Reception to follow
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 md:bottom-10 z-30"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#d4af37] font-bold opacity-80">Scroll</p>
                  <ChevronDown className="w-4 h-4 text-[#d4af37] opacity-70" />
                </motion.div>
              </motion.div>
            </section>

            <section className="relative pt-12 md:pt-20 pb-24 md:pb-32 w-full flex flex-col items-center bg-[#34d399]/10 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
              <div className="absolute inset-4 md:inset-8 border-[1.5px] border-[#047857]/30 pointer-events-none z-10" />
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
                  <p className="text-[#047857] text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold text-center leading-loose max-w-2xl">
                    TOGETHER WITH THEIR FAMILIES
                    <br />
                    we joyfully invite you to
                    <br />
                    CELEBRATE THE WEDDING OF
                    <span className="text-[#059669] font-playball text-2xl md:text-3xl block my-2 lowercase first-letter:uppercase">
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
                    className="relative z-10 w-[280px] h-[340px] md:w-[350px] md:h-[450px] bg-white p-4 shadow-[0_20px_50px_rgba(6,78,59,0.15)] border border-[#34d399]/40 rotate-[-3deg] md:-mr-16 card-marble"
                  >
                    <div className="w-full h-full overflow-hidden border border-[#34d399]/20 gold-foil-edge">
                      <img
                        src={brideGroomImage}
                        alt="Wedding"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110 grayscale-[0.2] contrast-110"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 40, y: 40 }}
                    whileInView={{ opacity: 1, x: 0, y: 20 }}
                    viewport={{ once: true }}
                    className="relative z-20 w-full max-w-[450px] bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(6,78,59,0.2)] border border-[#34d399]/50 flex flex-col items-center justify-center text-center card-marble"
                  >
                    <div className="absolute inset-0 gold-foil-edge opacity-20 pointer-events-none" />
                    <div className="absolute inset-2 border-[0.5px] border-[#059669]/30 pointer-events-none" />

                    <div className="space-y-2 mb-8 relative z-10">
                      <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-[#047857]/60">
                        Loving daughter of
                      </p>
                      <p className="text-[11px] font-serif text-[#047857] tracking-wider uppercase font-bold">
                        THE FAMILY OF
                        <br />& THE LATE PARENTS
                      </p>
                      <h3 className="text-5xl md:text-7xl font-script text-[#059669] pt-4 leading-none">
                        Ama
                      </h3>
                    </div>

                    <div className="py-6 flex items-center justify-center w-full relative z-10">
                      <div className="h-px w-full bg-[#34d399]/30" />
                      <span className="px-6 font-playball text-4xl text-[#059669] italic">&</span>
                      <div className="h-px w-full bg-[#34d399]/30" />
                    </div>

                    <div className="space-y-2 mt-8 relative z-10">
                      <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-[#047857]/60">
                        Loving son of
                      </p>
                      <p className="text-[11px] font-serif text-[#047857] tracking-wider uppercase font-bold">
                        THE FAMILY OF
                        <br />& THE LATE PARENTS
                      </p>
                      <h3 className="text-5xl md:text-7xl font-script text-[#059669] pt-4 leading-none">
                        Anjana
                      </h3>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>



            <section className="relative py-24 md:py-32 bg-white flex flex-col items-center overflow-hidden border-t-[0.5px] border-[#d4af37]/30 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] z-20">
              <div className="absolute inset-0 opacity-[0.6] bg-[url('https://www.transparenttextures.com/patterns/white-marble.png')] pointer-events-none" />
              
              {/* Very fine golden corner brackets for elegance */}
              <div className="absolute top-12 left-12 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute top-12 right-12 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute bottom-12 left-12 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute bottom-12 right-12 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>

              <div className="w-full max-w-[1000px] px-6 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative mb-12 flex flex-col items-center"
                >
                  <p className="font-montserrat text-[9px] md:text-[11px] tracking-[0.6em] text-[#d4af37] font-semibold uppercase mb-4">
                    The Countdown
                  </p>
                  <h2 className="font-serif text-5xl md:text-6xl text-slate-800 tracking-wider font-light italic">
                    Save the Date
                  </h2>
                  <div className="mt-8 flex items-center justify-center gap-6">
                    <div className="h-[0.5px] w-12 md:w-20 bg-[#d4af37]/50" />
                    <span className="font-montserrat text-[9px] md:text-[11px] tracking-[0.4em] uppercase text-slate-500 font-medium">May 09, 2026</span>
                    <div className="h-[0.5px] w-12 md:w-20 bg-[#d4af37]/50" />
                  </div>
                </motion.div>

                <CountdownTimer />

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
                        <div className="w-12 h-[1px] bg-[#047857]" />
                        <span className="text-[#047857] font-bold uppercase tracking-[0.4em] text-[10px]">
                          T H E · V E N U E
                        </span>
                      </div>
                      <h2 className="font-cinzel text-[2.5rem] md:text-[4rem] text-[#059669] leading-tight tracking-widest font-bold uppercase">
                        Kithul Kanda
                      </h2>
                      <p className="font-playball text-3xl md:text-5xl text-[#047857] italic mt-2">
                        MOUNTAIN RESORT
                      </p>
                    </div>

                    <div className="space-y-8 pl-6 border-l border-[#34d399]/40">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-[#047857] mt-1 shrink-0" />
                        <p className="text-lg md:text-xl text-[#047857] font-cinzel leading-relaxed tracking-wide">
                          Kithul Kanda Mountain Resort, Padukka.
                        </p>
                      </div>
                      <p className="text-[#047857]/70 text-sm md:text-base tracking-widest uppercase font-light leading-loose">
                        We look forward to welcoming you to this beautiful resort to celebrate our
                        special day. Reception to follow LOVE LAUGHTER FOREVER.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() =>
                          window.open("https://maps.app.goo.gl/Fw6MGDC4ifQxHhRLA", "_blank")
                        }
                        className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#047857] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-[#065f46]"
                      >
                        <MapPin className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                        Get Directions
                      </button>

                      <button
                        onClick={() => setIsAccommodationOpen(true)}
                        className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-white text-[#047857] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] border-2 border-[#047857] overflow-hidden transition-all hover:bg-[#047857]/5"
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
                    className="relative w-full aspect-[3/4] max-w-[450px] mx-auto bg-white p-3 shadow-[0_40px_80px_-20px_rgba(135,147,122,0.2)] border border-[#34d399]/50"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#059669]/30 pointer-events-none z-20" />
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
                      className="relative z-10 w-[94%] md:w-[88%] bg-white shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col items-center pt-8 md:pt-12 card-marble"
                    >
                      <div className="absolute inset-0 gold-foil-edge opacity-20 pointer-events-none" />
                      <div className="w-full border border-slate-300 rounded-[1.5rem] p-6 md:p-8 flex flex-col items-center mt-2 relative z-10">
                        <h3 className="font-script text-4xl md:text-6xl text-[#047857] mb-8 text-center">
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

            <div className="relative bg-[#34d399]/10">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <section className="relative py-24 md:py-36 flex flex-col items-center overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#047857]/10 mb-8 mt-4 shadow-sm border border-[#047857]/20">
                      <Sparkles className="w-8 h-8 text-[#047857]" />
                    </div>

                    <h2 className="font-script text-[4.5rem] sm:text-[5rem] md:text-[7rem] text-[#059669] mb-6 drop-shadow-sm leading-none">
                      Best Wishes
                    </h2>
                    <div className="h-px w-24 bg-[#34d399] mb-8" />

                    <p className="text-[#047857] text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-serif tracking-[0.1em] px-4 uppercase font-bold">
                      Your presence at our wedding is the greatest gift of all. However, if you
                      wish to honor us with a message, we would be delighted to read it!
                    </p>

                    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(6,78,59,0.1)] border border-[#34d399]/50 relative group card-marble">
                      <div className="absolute inset-0 gold-foil-edge opacity-20 pointer-events-none" />
                      <div className="absolute inset-2 border-[0.5px] border-[#059669]/20 pointer-events-none transition-colors duration-700" />

                      <form className="space-y-12 text-left relative z-10" onSubmit={handleWishSubmit}>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#047857]/40">
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
                            className="w-full bg-transparent border-b border-[#34d399]/40 px-0 py-4 text-[#047857] placeholder:text-[#34d399]/30 focus:outline-none focus:border-[#059669] transition-all font-cinzel text-lg tracking-widest"
                            required
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#047857]/40">
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
                            className="w-full bg-transparent border-b border-[#34d399]/40 px-0 py-4 text-[#047857] placeholder:text-[#34d399]/30 focus:outline-none focus:border-[#059669] transition-all font-cinzel text-lg tracking-widest resize-none"
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
                            className="bg-[#047857] text-white px-12 py-5 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-[#065f46] transition-all duration-300 shadow-md disabled:opacity-70"
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
                <div className="h-px w-24 bg-[#34d399] mb-16 opacity-50" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <p className="font-script text-6xl md:text-8xl text-[#059669] leading-tight">
                    With Love,
                  </p>
                  <h2 className="font-cinzel text-2xl md:text-4xl text-[#047857] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold">
                    AMA <span className="mx-2 md:mx-4 opacity-40 font-light">&</span> ANJANA
                  </h2>
                </motion.div>

                <div className="mt-24 md:mt-36 pt-12 border-t border-[#34d399]/20 w-full max-w-sm">
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] text-[#047857]/50 font-bold leading-loose">
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
        className="fixed bottom-6 left-6 z-[120] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#059669] bg-white/95 text-[#047857] shadow-[0_0_0_4px_rgba(197,160,89,0.2),0_10px_36px_-6px_rgba(135,147,122,0.45)] backdrop-blur-md touch-manipulation transition-[transform,box-shadow] hover:scale-[1.05] hover:shadow-[0_0_0_5px_rgba(197,160,89,0.28),0_14px_44px_-6px_rgba(135,147,122,0.5)] active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfaf5]"
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
          background: #34d39933;
        }
        ::-webkit-scrollbar-thumb {
          background: #04785766;
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
          className="w-full bg-[#047857] text-white py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-[#065f46] transition-all"
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
