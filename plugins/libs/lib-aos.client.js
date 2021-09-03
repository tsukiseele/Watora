import AOS from "aos";

import "aos/dist/aos.css";

AOS.init();

export default ({ app }, inject) => {
  inject("aos", AOS);
};
