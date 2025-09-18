import React, { useState } from "react";
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Palette,
  BookOpen,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ChevronRight,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const SCHOOL_IMG = "/students-group.jpg"; // Place your uploaded photo in the public/ folder with this name
  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher"); 
    const [showRegister, setShowRegister] = useState(false);// default role

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();

    if (role === "admin" && email === "admin@example.com" && password === "admin123") {
      alert("✅ Admin login successful!");
      setShowLogin(false);
    } else if (role === "teacher" && email === "teacher@example.com" && password === "teacher123") {
      alert("✅ Teacher login successful!");
      setShowLogin(false);
    } else {
      alert("❌ Invalid credentials for " + role);
    }
  };
  const nav = [
    { label: "Home", href: "#home" },
    { label: "Classes", href: "#classes" },
    { label: "Admissions", href: "#admissions" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const grades = [
    {
      title: "Playgroup",
      subtitle: "Ages 3–4",
      points: [
        "Foundational literacy & numeracy",
        "Play-based learning & routines",
        "Safe, caring environment",
      ],
    },
    {
      title: "PP1",
      subtitle: "Ages 4–5",
      points: [
        "Foundational literacy & numeracy",
        "Play-based learning & routines",
        "Safe, caring environment",
      ],
    },
    {
      title: "PP2",
      subtitle: "Ages 5–6",
      points: [
        "Foundational literacy & numeracy",
        "Play-based learning & routines",
        "Safe, caring environment",
      ],

    },
    {
      title: "Grade 1",
      subtitle: "Ages 7–8",
      points: [
        "Phonics & reading readiness",
        "Number sense & patterns",
        "Social skills & curiosity",
      ],
    },
    {
      title: "Grade 2",
      subtitle: "Ages 8–9",
      points: [
        "Fluency & comprehension",
        "Problem solving in math",
        "Arts, music & PE",
      ],
    },
    {
      title: "Grade 3",
      subtitle: "Ages 9–10",
      points: [
        "Project-based learning",
        "Science discovery labs",
        "Digital basics",
      ],
    },
    {
      title: "Grade 4",
      subtitle: "Ages 10–11",
      points: [
        "Research & presentations",
        "Fractions & geometry",
        "Clubs & co-curriculars",
      ],
    },
    {
      title: "Grade 5",
      subtitle: "Ages 11–12",
      points: [
        "STEM & creative writing",
        "Data & measurement",
        "Community service",
      ],
    },
    {
      title: "Grade 6",
      subtitle: "Ages 12–13",
      points: [
        "Exam readiness & leadership",
        "Pre-algebra concepts",
        "Science fair & debate",
      ],
    },
  ];

  return (
    <div id="top" className="min-h-screen bg-gradient-to-b from-rose-50 to-white text-slate-800">
      {/* Top Notice Bar */}
      <div className="w-full bg-rose-700 text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <p>Admissions now open for Playgroup, PP1, PP2 & Grades 1–6 </p>
          </div>
          <a
            href="#admissions"
            className="inline-flex items-center gap-1 underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            Learn more <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-rose-100/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-700 text-white shadow">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <p className="font-extrabold text-slate-900">Jubilant Journeys Academy</p>
                <p className="text-xs text-slate-500">Where curiosity becomes confidence</p>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-6">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="text-sm font-medium text-slate-700 hover:text-rose-700">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setShowLogin(true)}
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-rose-400 hover:text-rose-700"
              >
                Login
              </button
              >
              <a
                href="#admissions"
                className="inline-flex items-center rounded-xl bg-rose-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-800"
              >
                Enroll Now
              </a>
            </div>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-300 p-2 text-slate-700 hover:bg-white"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col gap-2">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-rose-50"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setMobileOpen(false);
                    }}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold"
                  >
                    Login
                  </button>
                  <a
                    href="#admissions"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-lg bg-rose-700 px-3 py-2 text-center text-sm font-semibold text-white"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.25),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                <Calendar className="h-3.5 w-3.5" /> Term 1 admissions now open
              </div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Nurturing <span className="bg-gradient-to-r from-rose-700 to-sky-600 bg-clip-text text-transparent">bright minds</span> for a brighter future
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                At Jubilant Journeys Academy, we blend academics, creativity, and character to help every child thrive—from Playgroup to Grade 6.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#admissions"
                  className="inline-flex items-center rounded-xl bg-rose-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-rose-800"
                >
                  Apply Now <ChevronRight className="ml-1 h-4 w-4" />
                </a>
                <a
                  href="#classes"
                  className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-rose-400 hover:text-rose-700"
                >
                  Explore Classes
                </a>
              </div>

              {/* Stats */}
              <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
                  <dt className="text-xs text-slate-500">Student–Teacher Ratio</dt>
                  <dd className="text-2xl font-extrabold text-slate-900">15:1</dd>
                </div>
                <div className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
                  <dt className="text-xs text-slate-500">Clubs & Activities</dt>
                  <dd className="text-2xl font-extrabold text-slate-900">10+</dd>
                </div>
                <div className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
                  <dt className="text-xs text-slate-500">Happy Learners</dt>
                  <dd className="text-2xl font-extrabold text-slate-900">500+</dd>
                </div>
              </dl>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-rose-200/60 to-sky-200/60 blur-2xl" />
              <img
                src={SCHOOL_IMG}
                alt="Smiling students learning together in a bright classroom"
                className="h-full w-full rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Why Families Choose Us</h2>
          <p className="mt-3 text-slate-600">A caring community, a robust curriculum, and joyful learning experiences.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature icon={ShieldCheck} title="Safe & Caring" text="Child-first policies, secure campus, and attentive staff." />
          <Feature icon={BookOpen} title="Strong Academics" text="Literacy, numeracy, and science foundations for life-long learning." />
          <Feature icon={Palette} title="Creative Arts" text="Music, art, and drama woven into weekly routines." />
          <Feature icon={Users} title="Holistic Growth" text="Clubs, sports, and leadership to develop the whole child." />
        </div>
      </section>

      {/* Classes */}
      <section id="classes" className="bg-gradient-to-b from-white to-amber-50/60">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Our Classes</h2>
            <p className="mt-3 text-slate-600">From Playgroup through Grade 6, every stage is supported by a tailored curriculum and caring educators.</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grades.map((g) => (
              <div key={g.title} className="group relative overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition hover:shadow-md">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-rose-100/60 blur-2xl transition group-hover:scale-110" />
                <div className="relative p-6">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                    <GraduationCap className="h-3.5 w-3.5" /> {g.subtitle}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{g.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {g.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#admissions"
                    className="mt-5 inline-flex items-center rounded-xl bg-rose-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-800"
                  >
                    Apply for {g.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section id="admissions" className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Admissions & Enrollment</h2>
              <p className="mt-3 text-slate-600">
                We welcome new learners across Playgroup and Grades 1–6. School tours are conducted weekly. Scholarships available based on need and merit.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-rose-700" /> Submit application form online</li>
                <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-rose-700" /> Provide previous school report (Grades 2–6)</li>
                <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-rose-700" /> Schedule an interview & tour</li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#contact" className="inline-flex items-center rounded-xl bg-rose-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-rose-800">Contact Admissions</a>
                <button onClick={() => setShowLogin(true)} className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-rose-400 hover:text-rose-700">Teachers/Admin Portal Login</button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-rose-200/60 to-amber-200/60 blur-2xl" />
              <img
                src={SCHOOL_IMG}
                alt="Teacher guiding primary students during a science activity"
                className="h-full w-full rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Get in Touch</h2>
            <p className="mt-3 text-slate-600">We'd love to meet you and your child. Reach out to plan a visit or ask any questions.</p>
            <div className="mt-6 space-y-4">
              <p className="flex items-start gap-3 text-slate-700"><MapPin className="mt-0.5 h-5 w-5 text-rose-700" /> Ekerubo, Kisii</p>
              <p className="flex items-start gap-3 text-slate-700"><Phone className="mt-0.5 h-5 w-5 text-rose-700" /> +254 706204839 </p>
              <p className="flex items-start gap-3 text-slate-700"><Mail className="mt-0.5 h-5 w-5 text-rose-700" /> admissions@jubilantjourneys.ac.ke</p>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Book a School Tour</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-sm font-medium text-slate-700">Your Name</label>
                <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-rose-200 focus:ring" placeholder="Jane Doe" />
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input type="email" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-rose-200 focus:ring" placeholder="you@example.com" />
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm font-medium text-slate-700">Phone</label>
                <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-rose-200 focus:ring" placeholder="+254..." />
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm font-medium text-slate-700">Preferred Date</label>
                <input type="date" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-rose-200 focus:ring" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea rows={4} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-rose-200 focus:ring" placeholder="Tell us about your child…" />
              </div>
            </div>
            <button className="mt-4 inline-flex items-center rounded-xl bg-rose-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-rose-800">
              Submit Request
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rose-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-700 text-white shadow">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <p className="font-extrabold text-slate-900">Jubilant Journeys Academy</p>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Excellence in academics, character, and creativity.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Quick Links</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a href="#classes" className="hover:text-rose-700">Classes</a></li>
                <li><a href="#admissions" className="hover:text-rose-700">Admissions</a></li>
                <li><a href="#contact" className="hover:text-rose-700">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">School Hours</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Mon–Fri: 7:30am – 4:00pm</li>
                <li>Sat: 9:00am – 12:00pm (Clubs)</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-rose-700" /> +254 706204839</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-rose-700" /> info@jubilantjourneys.ac.ke</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-rose-700" /> Ekerubo, Kisii</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-rose-100 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} Jubilant Journeys Academy. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Teacher /Admin Login</h3>
                <p className="mt-1 text-sm text-slate-600">Access your portal to view updates, fees, and results.</p>
              </div>
              <button
                onClick={() => setShowLogin(false)}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
                aria-label="Close login"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="mt-4 space-y-4">
  {/* Role Selection */}
  <div>
    <label className="text-sm font-medium text-slate-700">Role</label>
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-rose-200 focus:ring"
    >
      <option value="teacher">Teacher</option>
      <option value="admin">Admin</option>
    </select>
  </div>

  {/* Email */}
  <div>
    <label className="text-sm font-medium text-slate-700">Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-rose-200 focus:ring"
      placeholder="you@example.com"
    />
  </div>

  {/* Password */}
  <div>
    <label className="text-sm font-medium text-slate-700">Password</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-rose-200 focus:ring"
      placeholder="••••••••"
    />
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full rounded-xl bg-rose-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-800"
  >
    Login as {role.charAt(0).toUpperCase() + role.slice(1)}
  </button>

  {/* Links */}
  <div className="flex items-center justify-between text-xs text-slate-600">
    <a href="#" className="hover:text-rose-700">Forgot password?</a>
    <a href="#" className="hover:text-rose-700">Create account</a>
  </div>
</form>
          </div>
        </div>
      )}
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{text}</p>
    </div>
  );
}
