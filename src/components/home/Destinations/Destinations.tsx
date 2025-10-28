import { Dictionary } from "@/types/dictionary";
import DestinationsSlider from "./components/DestinationsSlider";

interface DestinationsProps {
  dict: Dictionary;
}

export default function Destinations({ dict }: DestinationsProps) {
  return (
    <section className="destinations" aria-labelledby="destinations">
      <div className="destinations__body container">
        <div className="destinations__header">
          <h2 id="destinations-title" className="destinations__title">
            {dict.destinations.title}
          </h2>
          <p className="destinations__description">
            {dict.destinations.description}
          </p>
        </div>
        <div className="destinations__slider">
          <DestinationsSlider dict={dict} />
        </div>
      </div>
    </section>
  );
}
