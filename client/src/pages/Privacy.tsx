import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | Etienne Agency";
  }, []);

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray">
            <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-8">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you submit our contact form, we collect your name, email address, phone number, company name,
              industry, number of locations, and any challenge description you choose to share.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information you provide solely to respond to your inquiry, schedule discovery calls,
              and communicate about our AI receptionist and scheduling services. We do not sell or rent your
              personal information to third parties.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">3. Data Storage & Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your information is stored securely and retained only as long as necessary to fulfill the purposes
              described above. We implement industry-standard security measures to protect your data.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">4. Analytics</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use privacy-focused analytics to understand how visitors interact with our website. This data
              is aggregated and does not personally identify you.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may request access to, correction of, or deletion of your personal information at any time
              by contacting us at{" "}
              <a href="mailto:jim@etienneagency.com" className="text-primary hover:text-primary/80">jim@etienneagency.com</a>.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">6. Contact</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:jim@etienneagency.com" className="text-primary hover:text-primary/80">jim@etienneagency.com</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
