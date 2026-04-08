import { useEffect, useMemo, useState } from "react";

type WorkItem = {
  id: string;
  title: string;
  category: string;
  text: string;
  video: string;
  image: string;
};

export default function App() {
  const ADMIN_LOGIN = "Zuxi";
  const ADMIN_PASSWORD = "Zuxi123";

  const defaultSiteData = useMemo(
    () => ({
      brand: "ZUXI.UZ",
      tagline: "Media designer • Video editor • Creative portfolio",
      heroTitle: "ZUXI",
      heroSub: "Creative media portfolio",
      phone: "+998 91 077 03 08",
      telegram: "@zuxi_uz",
      telegramUrl: "https://t.me/zuxi_uz",
      instagram: "@Zuxi.photography",
      instagramUrl: "https://instagram.com/Zuxi.photography",
      email: "eshmuminov18@gmail.com",
    }),
    []
  );

  const defaultWorks: WorkItem[] = [
    {
      id: "1",
      title: "Banner",
      category: "Design",
      text: "Professional banner",
      video: "/videos/work1.mp4",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    },
    {
      id: "2",
      title: "Video",
      category: "Editing",
      text: "Event video",
      video: "/videos/work2.mp4",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800",
    },
  ];

  const [siteData, setSiteData] = useState(defaultSiteData);
  const [works, setWorks] = useState<WorkItem[]>(defaultWorks);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("zuxi-admin");
    if (saved === "true") setIsAuthed(true);

    const sd = localStorage.getItem("zuxi-site");
    const sw = localStorage.getItem("zuxi-works");
    if (sd) setSiteData(JSON.parse(sd));
    if (sw) setWorks(JSON.parse(sw));
  }, []);

  useEffect(() => {
    localStorage.setItem("zuxi-site", JSON.stringify(siteData));
    localStorage.setItem("zuxi-works", JSON.stringify(works));
  }, [siteData, works]);

  const handleLogin = () => {
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      localStorage.setItem("zuxi-admin", "true");
    } else {
      alert("Login yoki parol xato");
    }
  };

  const addWork = () => {
    setWorks((p) => [
      ...p,
      {
        id: Date.now().toString(),
        title: "New work",
        category: "Category",
        text: "Description",
        video: "",
        image: "",
      },
    ]);
  };

  const updateWork = (id: string, field: keyof WorkItem, value: string) => {
    setWorks((p) => p.map((w) => (w.id === id ? { ...w, [field]: value } : w)));
  };

  const deleteWork = (id: string) => {
    setWorks((p) => p.filter((w) => w.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold">{siteData.brand}</h1>
          <p className="text-xs text-white/60">{siteData.tagline}</p>
        </div>
        <button onClick={() => setIsAdminOpen(true)} className="border border-white/20 px-3 py-1.5 rounded-md hover:bg-white/10">
          Admin
        </button>
      </header>

      <section className="relative h-[70vh] overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
          <source src="/videos/hero.mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-10 md:p-16">
          <h2 className="text-5xl md:text-7xl font-bold">{siteData.heroTitle}</h2>
          <p className="mt-3 text-white/80 text-lg">{siteData.heroSub}</p>
        </div>
      </section>

      <section className="p-6 md:p-10 grid md:grid-cols-2 gap-6">
        {works.map((w) => (
          <div key={w.id} onClick={() => setSelectedWork(w)} className="cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src={w.image} className="w-full h-72 object-cover hover:scale-105 transition duration-300" />
            <div className="p-4">
              <div className="text-sm text-white/60">{w.category}</div>
              <div className="text-lg font-semibold">{w.title}</div>
              <div className="text-sm text-white/70 mt-1">{w.text}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="px-6 md:px-10 pb-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 p-4 bg-white/5">
          <div className="text-sm text-white/60">Telefon</div>
          <div className="mt-2">{siteData.phone}</div>
        </div>
        <div className="rounded-xl border border-white/10 p-4 bg-white/5">
          <div className="text-sm text-white/60">Telegram</div>
          <a href={siteData.telegramUrl} className="mt-2 block hover:underline">{siteData.telegram}</a>
        </div>
        <div className="rounded-xl border border-white/10 p-4 bg-white/5">
          <div className="text-sm text-white/60">Instagram</div>
          <a href={siteData.instagramUrl} className="mt-2 block hover:underline">{siteData.instagram}</a>
        </div>
        <div className="rounded-xl border border-white/10 p-4 bg-white/5">
          <div className="text-sm text-white/60">Email</div>
          <div className="mt-2">{siteData.email}</div>
        </div>
      </section>

      {selectedWork && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <video src={selectedWork.video} controls autoPlay className="w-full rounded-xl border border-white/10 bg-black" />
            <button onClick={() => setSelectedWork(null)} className="mt-4 px-4 py-2 bg-white text-black rounded-md">
              Yopish
            </button>
          </div>
        </div>
      )}

      {isAdminOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-end">
          <div className="w-full max-w-2xl bg-black p-6 overflow-y-auto border-l border-white/10">
            {!isAuthed ? (
              <div>
                <h2 className="text-xl font-semibold">Login</h2>
                <input placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} className="block w-full mt-4 p-3 bg-black border border-white/20 rounded-md" />
                <input placeholder="Parol" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full mt-3 p-3 bg-black border border-white/20 rounded-md" />
                <div className="flex gap-3 mt-4">
                  <button onClick={handleLogin} className="border border-white/20 px-4 py-2 rounded-md hover:bg-white/10">Kirish</button>
                  <button onClick={() => setIsAdminOpen(false)} className="border border-white/20 px-4 py-2 rounded-md hover:bg-white/10">Yopish</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Admin panel</h2>
                  <button
                    onClick={() => {
                      setIsAuthed(false);
                      localStorage.removeItem("zuxi-admin");
                    }}
                    className="border border-white/20 px-3 py-2 rounded-md hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>

                <h3 className="mt-6 mb-3 font-semibold">Matnlar</h3>
                <input value={siteData.brand} onChange={(e) => setSiteData({ ...siteData, brand: e.target.value })} className="w-full mb-3 p-3 bg-black border border-white/20 rounded-md" placeholder="Brand" />
                <input value={siteData.tagline} onChange={(e) => setSiteData({ ...siteData, tagline: e.target.value })} className="w-full mb-3 p-3 bg-black border border-white/20 rounded-md" placeholder="Tagline" />
                <input value={siteData.heroTitle} onChange={(e) => setSiteData({ ...siteData, heroTitle: e.target.value })} className="w-full mb-3 p-3 bg-black border border-white/20 rounded-md" placeholder="Hero title" />
                <input value={siteData.heroSub} onChange={(e) => setSiteData({ ...siteData, heroSub: e.target.value })} className="w-full mb-3 p-3 bg-black border border-white/20 rounded-md" placeholder="Hero subtitle" />

                <h3 className="mt-6 mb-3 font-semibold">Aloqa</h3>
                <input value={siteData.phone} onChange={(e) => setSiteData({ ...siteData, phone: e.target.value })} className="w-full mb-3 p-3 bg-black border border-white/20 rounded-md" placeholder="Telefon" />
                <input value={siteData.telegram} onChange={(e) => setSiteData({ ...siteData, telegram: e.target.value })} className="w-full mb-3 p-3 bg-black border border-white/20 rounded-md" placeholder="Telegram" />
                <input value={siteData.telegramUrl} onChange={(e) => setSiteData({ ...siteData, telegramUrl: e.target.value })} className="w-full mb-3 p-3 bg-black border border-white/20 rounded-md" placeholder="Telegram URL" />
                <input value={siteData.instagram} onChange={(e) => setSiteData({ ...siteData, instagram: e.target.value })} className="w-full mb-3 p-3 bg-black border border-white/20 rounded-md" placeholder="Instagram" />
                <input value={siteData.instagramUrl} onChange={(e) => setSiteData({ ...siteData, instagramUrl: e.target.value })} className="w-full mb-3 p-3 bg-black border border-white/20 rounded-md" placeholder="Instagram URL" />
                <input value={siteData.email} onChange={(e) => setSiteData({ ...siteData, email: e.target.value })} className="w-full mb-3 p-3 bg-black border border-white/20 rounded-md" placeholder="Email" />

                <h3 className="mt-6">Portfolio</h3>
                <button onClick={addWork} className="border border-white/20 px-3 py-1 mt-2 rounded-md hover:bg-white/10">+ Qo‘shish</button>

                {works.map((w) => (
                  <div key={w.id} className="border border-white/20 p-3 mt-3 rounded-xl">
                    <input value={w.title} onChange={(e) => updateWork(w.id, "title", e.target.value)} className="w-full mb-2 p-3 bg-black border border-white/20 rounded-md" placeholder="Title" />
                    <input value={w.category} onChange={(e) => updateWork(w.id, "category", e.target.value)} className="w-full mb-2 p-3 bg-black border border-white/20 rounded-md" placeholder="Category" />
                    <textarea value={w.text} onChange={(e) => updateWork(w.id, "text", e.target.value)} className="w-full mb-2 p-3 bg-black border border-white/20 rounded-md" placeholder="Description" rows={3} />
                    <input value={w.image} placeholder="Rasm URL yoki /images/work1.jpg" onChange={(e) => updateWork(w.id, "image", e.target.value)} className="w-full mb-2 p-3 bg-black border border-white/20 rounded-md" />
                    <input value={w.video} placeholder="Video URL yoki /videos/work1.mp4" onChange={(e) => updateWork(w.id, "video", e.target.value)} className="w-full mb-2 p-3 bg-black border border-white/20 rounded-md" />
                    <button onClick={() => deleteWork(w.id)} className="text-red-400">Delete</button>
                  </div>
                ))}

                <button onClick={() => setIsAdminOpen(false)} className="mt-6 border border-white/20 px-4 py-2 rounded-md hover:bg-white/10">Yopish</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
