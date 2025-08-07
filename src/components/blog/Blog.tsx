"use client";

import React from "react";

export default function Blog() {
  return (
    <section className="blog" aria-labelledby="blog">
      <div className="blog__body container">
        <div className="blog__header">
          <h2 id="blog-title" className="blog__title">
            Blog
          </h2>
          <p className="blog__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="blog__content">
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
          <p>
            Vestibulum bibendum dapibus libero a vestibulum. Cras fringilla elit
            lorem, a posuere ex porttitor eleifend. Duis bibendum dictum odio,
            vel vehicula mi pulvinar eu. Praesent dignissim, ligula quis auctor
            placerat, odio elit imperdiet diam, vel vulputate quam arcu non
            augue. Sed a gravida enim. Proin lacinia luctus dui faucibus
            sodales. In et massa a nisi semper ullamcorper sit amet quis leo.
            Aenean eget nunc non velit dapibus ullamcorper. Fusce viverra dui et
            tempus cursus. Aliquam lectus orci, dapibus sed gravida id,
            tincidunt quis lorem. Sed fringilla nunc vel risus ultrices, a
            dictum est sodales.
          </p>
        </div>
      </div>
    </section>
  );
}
