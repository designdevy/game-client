import React from 'react';

export default function switchValues(type) {
  switch (type) {
    case 2:
      return {
        values: [
          <img
            className="figure"
            src="https://cdn3.iconfinder.com/data/icons/eldorado-stroke-symbols/40/shape_circle-512.png"
            alt="figure"
          />,
          <img
            className="figure"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/400px-Regular_triangle.svg.png"
            alt="figure"
          />,
          <img
            className="figure"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/500px-Square_-_black_simple.svg.png"
            alt="figure"
          />,
          <img
            className="figure"
            src="https://cdn0.iconfinder.com/data/icons/symbols-symbols-add-on-3-vol-1/48/v-26-512.png"
            alt="figure"
          />,
          <img
            className="figure"
            src="https://cdn4.iconfinder.com/data/icons/line-icons-12/64/software_shape_oval-512.png"
            alt="figure"
          />
        ]
      };
    case 3:
      return {
        values: [
          <img
            className="emoji"
            src="http://blogimages.bloggen.be/girlsworld123/2756129-703a5d968ed8de1b15241d027ecdcb3c.png"
            alt="emoji"
          />,
          <img
            className="emoji"
            src="http://blogimages.bloggen.be/girlsworld123/2756129-672df81e6d951c25dafaf7de42e6b1a7.png"
            alt="emoji"
          />,
          <img
            className="emoji"
            src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://www.itpedia.nl/wp-content/uploads/2018/02/Thinking_Face_Emoji-300x300.png"
            alt="emoji"
          />,
          <img
            className="emoji"
            src="http://distillerie-vercors.com/wp-content/uploads/2015/12/1f60e-300x300.png"
            alt="emoji"
          />,
          <img
            className="emoji"
            src="https://cdn.pixabay.com/photo/2017/07/18/15/37/cry-2516128_960_720.png"
            alt="emoji"
          />
        ]
      };
    case 4:
      return {
        values: [
          <img
            className="color"
            src="/images/red_dot.png"
            alt="color"
          />,
          <img
            className="color"
            src="/images/yellow_dot.png"
            alt="color"
          />,
          <img
            className="color"
            src="/images/green_dot.png"
            alt="color"
          />,
          <img
            className="color"
            src='/images/blue_dot.png'
            alt="color"
          />,
          <img
            className="color"
            src="/images/violet_dot.png"
            alt="color"
          />
        ]
      };
    default:
      return { values: [1, 2, 3, 4, 5] };
  }
}
