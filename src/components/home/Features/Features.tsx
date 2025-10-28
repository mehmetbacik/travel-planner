import { Dictionary } from "@/types/dictionary";
import FeaturesList from "./components/FeaturesList";

interface FeaturesProps {
  dict: Dictionary;
}

export default function Features({ dict }: FeaturesProps) {
  return (
    <section className="features" aria-labelledby="features">
      <div className="features__body container">
        <div className="features__header">
          <h2 id="features-title" className="features__title">
            {dict.features.title}
          </h2>
          <p className="features__description">
            {dict.features.description}
          </p>
        </div>
        <FeaturesList dict={dict} />
      </div>
    </section>
  );
}
