"use client";

import React from "react";

export default function About() {
  return (
    <section className="about" aria-labelledby="about">
      <div className="about__body container">
        <div className="about__header">
          <h2 id="about-title" className="about__title">
            About Us
          </h2>
          <p className="about__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="about__content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            mauris massa, viverra ac leo a, pharetra condimentum quam. Donec
            scelerisque pellentesque condimentum. Sed molestie mollis urna,
            vitae mollis felis molestie eu. Aliquam dictum metus quis risus
            finibus, a lacinia mauris porttitor. Mauris cursus sagittis erat, ut
            lobortis magna congue vel. Vivamus dapibus aliquam facilisis. Duis
            lorem velit, dapibus at odio feugiat, lobortis facilisis nisl.
            Maecenas suscipit fringilla orci. Sed et enim ornare, vestibulum
            eros vel, dictum velit. Quisque tincidunt lectus quis dui lobortis
            porta.
          </p>
        </div>
      </div>
    </section>
  );
}
