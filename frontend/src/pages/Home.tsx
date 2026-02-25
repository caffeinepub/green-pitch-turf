import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Zap,
  Users,
  Trophy,
  ChevronRight,
} from 'lucide-react';

const features = [
  {
    icon: <Trophy className="w-7 h-7" />,
    title: 'Premium Turf Quality',
    description:
      'International-grade artificial grass with perfect bounce and grip for an authentic cricket experience.',
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Flood-Lit Facility',
    description:
      'State-of-the-art LED floodlights for crystal-clear visibility during evening and night matches.',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Instant Booking',
    description:
      'Book your slot online in seconds. Choose your preferred date and time with real-time availability.',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Group Friendly',
    description:
      'Spacious facility accommodating teams of all sizes. Perfect for practice sessions and tournaments.',
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Flexible Hours',
    description:
      'Open from 5:00 AM to 11:00 PM daily. Early morning and late-night slots available.',
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: 'Modern Amenities',
    description:
      'Changing rooms, equipment storage, seating area, and refreshments available on-site.',
  },
];

const stats = [
  { value: '500+', label: 'Happy Players' },
  { value: '2', label: 'Premium Pitches' },
  { value: '18hrs', label: 'Daily Access' },
  { value: '4.9★', label: 'Rating' },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-turf.dim_1600x700.png')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Decorative stripe pattern */}
        <div className="absolute inset-0 section-stripe opacity-30" />

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 text-gold rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              Premium Cricket Turf Facility
            </div>

            {/* Headline */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight mb-4">
              GREEN PITCH
              <br />
              <span className="text-gold">TURF</span>
            </h1>

            <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              Experience cricket like never before. Book your slot on our world-class turf and play
              the game you love, any time of day.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/booking">
                <Button
                  size="lg"
                  className="bg-gold text-turf-dark hover:bg-gold/90 font-heading font-bold tracking-wide text-base px-8 shadow-gold"
                >
                  Book a Slot
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <a href="#about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 hover:border-white font-heading tracking-wide text-base px-8"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="bg-turf-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-heading text-3xl font-bold text-gold">{stat.value}</span>
                <span className="text-white/60 text-sm mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary font-heading font-semibold text-sm tracking-widest uppercase">
              Why Choose Us
            </span>
            <h2 className="font-heading text-4xl font-bold text-foreground mt-2">
              World-Class Facilities
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Everything you need for the perfect cricket experience, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-sm border border-border bg-card hover:border-primary/40 hover:shadow-turf transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-sm bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-heading font-semibold text-sm tracking-widest uppercase">
                About Us
              </span>
              <h2 className="font-heading text-4xl font-bold text-foreground mt-2 mb-6">
                The Home of Cricket in Your City
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Green Pitch Turf was founded with a single mission: to provide cricket lovers with
                a premium, accessible facility where they can enjoy the sport they're passionate
                about. Our state-of-the-art turf is maintained to the highest standards.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Whether you're a seasoned player looking for competitive practice or a beginner
                just starting out, our facility caters to all skill levels. We offer flexible
                booking slots to fit your schedule.
              </p>
              <ul className="space-y-3">
                {[
                  'International-grade artificial turf surface',
                  'Professional pitch dimensions (22 yards)',
                  'Dedicated practice nets available',
                  'Umpire services on request',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="rounded-sm overflow-hidden shadow-turf">
                <img
                  src="/assets/generated/pitch-texture.dim_800x500.png"
                  alt="Cricket pitch close-up"
                  className="w-full h-80 object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-turf-dark text-white rounded-sm p-4 shadow-lg">
                <div className="font-heading text-2xl font-bold text-gold">5+ Years</div>
                <div className="text-white/70 text-xs">of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-turf-dark relative overflow-hidden">
        <div className="absolute inset-0 section-stripe opacity-20" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready to Play?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
            Book your slot now and experience the thrill of cricket on our premium turf.
          </p>
          <Link to="/booking">
            <Button
              size="lg"
              className="bg-gold text-turf-dark hover:bg-gold/90 font-heading font-bold tracking-wide text-base px-10 shadow-gold"
            >
              Book Your Slot Today
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary font-heading font-semibold text-sm tracking-widest uppercase">
              Find Us
            </span>
            <h2 className="font-heading text-4xl font-bold text-foreground mt-2">
              Contact & Location
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <div className="p-6 rounded-sm border border-border bg-card text-center hover:border-primary/40 hover:shadow-turf transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground text-sm">Pillikothi,</p>
              <p className="text-muted-foreground text-sm">In Front of Roadways Bus Stand,</p>
              <p className="text-muted-foreground text-sm">Near Froth N Fables</p>
            </div>

            {/* Phone */}
            <div className="p-6 rounded-sm border border-border bg-card text-center hover:border-primary/40 hover:shadow-turf transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm">
                <a href="tel:7233818191" className="hover:text-primary transition-colors">
                  +91 72338 18191
                </a>
              </p>
              <p className="text-muted-foreground text-sm">
                <a href="tel:9044430809" className="hover:text-primary transition-colors">
                  +91 90444 30809
                </a>
              </p>
            </div>

            {/* Email */}
            <div className="p-6 rounded-sm border border-border bg-card text-center hover:border-primary/40 hover:shadow-turf transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">
                <a
                  href="mailto:greenpitchturf@gmail.com"
                  className="hover:text-primary transition-colors break-all"
                >
                  greenpitchturf@gmail.com
                </a>
              </p>
            </div>

            {/* Hours */}
            <div className="p-6 rounded-sm border border-border bg-card text-center hover:border-primary/40 hover:shadow-turf transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Hours</h3>
              <p className="text-muted-foreground text-sm">Mon – Sun: 5:00 AM – 11:00 PM</p>
              <p className="text-muted-foreground text-sm">Holidays: 6:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
