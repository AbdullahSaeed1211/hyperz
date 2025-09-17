<template>
  <span class="menu-icon">
    <component :is="iconComponent" />
  </span>
</template>

<script>
export default {
  name: "SidebarIcon",
  props: {
    type: { type: String, required: true },
    active: { type: Boolean, default: false },
  },
  computed: {
    strokeColor() {
      return this.active ? "white" : "#B4B4B4";
    },
    fillColor() {
      return this.active ? "white" : "none";
    },
    iconComponent() {
      const props = { stroke: this.strokeColor, fill: this.fillColor };
      const map = {
        dashboard: {
          render: (h) =>
            h(
              "svg",
              {
                attrs: {
                  width: 53,
                  height: 53,
                  viewBox: "0 0 53 53",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                h("path", {
                  attrs: {
                    d: "M17.7 6.09961H11C8.3 6.09961 6 8.29961 6 11.0996V41.9996C6 44.6996 8.2 46.9996 11 46.9996H17.6C20.3 46.9996 22.6 44.7996 22.6 41.9996V10.9996C22.6 8.29961 20.4 6.09961 17.7 6.09961Z",
                    fill: props.fill,
                    stroke: props.stroke,
                    "stroke-width": 3.3461,
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M41.9999 6.09961H35.3999C32.6999 6.09961 30.3999 8.29961 30.3999 11.0996V17.6996C30.3999 20.3996 32.5999 22.6996 35.3999 22.6996H41.9999C44.6999 22.6996 46.9999 20.4996 46.9999 17.6996V10.9996C46.8999 8.29961 44.6999 6.09961 41.9999 6.09961Z",
                    fill: props.fill,
                    stroke: props.stroke,
                    "stroke-width": 3.3461,
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M41.9999 30.3994H35.3999C32.6999 30.3994 30.3999 32.5994 30.3999 35.3994V41.9994C30.3999 44.6994 32.5999 46.9994 35.3999 46.9994H41.9999C44.6999 46.9994 46.9999 44.7994 46.9999 41.9994V35.3994C46.8999 32.5994 44.6999 30.3994 41.9999 30.3994Z",
                    fill: props.fill,
                    stroke: props.stroke,
                    "stroke-width": 3.3461,
                  },
                }),
              ]
            ),
        },
        orders: {
          render: (h) =>
            h(
              "svg",
              {
                attrs: {
                  width: 66,
                  height: 66,
                  viewBox: "0 0 66 66",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                h("path", {
                  attrs: {
                    d: "M56.0658 19.6853L33.0004 33.0023L9.92578 19.6641",
                    stroke: props.stroke,
                    "stroke-width": 3.31,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M33 33V57.75",
                    stroke: props.stroke,
                    "stroke-width": 3.31,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M30.792 6.77531C32.1585 5.98635 33.8421 5.98635 35.2086 6.77531L54.6077 17.9753C55.9742 18.7643 56.816 20.2223 56.816 21.8003V44.2003C56.816 45.7783 55.9742 47.2363 54.6077 48.0253L35.2086 59.2253C33.8421 60.0143 32.1585 60.0143 30.792 59.2253L11.3929 48.0253C10.0264 47.2363 9.18457 45.7783 9.18457 44.2003V21.8003C9.18457 20.2223 10.0264 18.7643 11.3929 17.9753L30.792 6.77531Z",
                    stroke: props.stroke,
                    "stroke-width": 3.31,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M23.375 12.375L44 24.75",
                    stroke: props.stroke,
                    "stroke-width": 3.31,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
              ]
            ),
        },
        merchant: {
          render: (h) =>
            h(
              "svg",
              {
                attrs: {
                  width: 66,
                  height: 66,
                  viewBox: "0 0 66 66",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                h("path", {
                  attrs: {
                    d: "M41.25 57.75H13.7779C10.7249 57.75 8.25 55.2751 8.25 52.2221V22.0139C8.25 20.4875 9.48746 19.25 11.0139 19.25H38.4861C40.0125 19.25 41.25 20.4875 41.25 22.0139V28.875",
                    stroke: props.stroke,
                    "stroke-width": 4.14279,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M24.75 33.0139C24.75 31.4875 25.9875 30.25 27.5139 30.25H54.9861C56.5125 30.25 57.75 31.4875 57.75 33.0139V52.2221C57.75 55.2751 55.2751 57.75 52.2221 57.75H30.2779C27.2249 57.75 24.75 55.2751 24.75 52.2221V33.0139Z",
                    stroke: props.stroke,
                    "stroke-width": 4.14279,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M33 19.2461V16.4961C33 11.9397 29.3063 8.24609 24.75 8.24609V8.24609C20.1937 8.24609 16.5 11.9397 16.5 16.4961V19.2461",
                    stroke: props.stroke,
                    "stroke-width": 4.14279,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M35.75 38.5L35.75 41.25C35.75 44.2876 38.2124 46.75 41.25 46.75V46.75C44.2876 46.75 46.75 44.2876 46.75 41.25L46.75 38.5",
                    stroke: props.stroke,
                    "stroke-width": 4.14279,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
              ]
            ),
        },
        customers: {
          render: (h) =>
            h(
              "svg",
              {
                attrs: {
                  width: 66,
                  height: 66,
                  viewBox: "0 0 66 66",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                h("path", {
                  attrs: {
                    d: "M8.25 52.25V49.5C8.25 43.4249 13.1749 38.5 19.25 38.5H30.25C36.3251 38.5 41.25 43.4249 41.25 49.5V52.25",
                    stroke: props.stroke,
                    "stroke-width": 3.31,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M41.25 30.25C45.8063 30.25 49.5 26.5563 49.5 22C49.5 17.4437 45.8063 13.75 41.25 13.75",
                    stroke: props.stroke,
                    "stroke-width": 3.31,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M57.75 52.25V49.5C57.75 43.4249 52.8251 38.5 46.75 38.5H45.375",
                    stroke: props.stroke,
                    "stroke-width": 3.31,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M33 22C33 26.5563 29.3063 30.25 24.75 30.25C20.1937 30.25 16.5 26.5563 16.5 22C16.5 17.4437 20.1937 13.75 24.75 13.75C29.3063 13.75 33 17.4437 33 22Z",
                    stroke: props.stroke,
                    "stroke-width": 3.31,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                }),
              ]
            ),
        },
        promotions: {
          render: (h) =>
            h(
              "svg",
              {
                attrs: {
                  width: 66,
                  height: 66,
                  viewBox: "0 0 66 66",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                h("path", {
                  attrs: {
                    d: "M46.751 7.5625H19.251C12.7961 7.5625 7.56348 12.7952 7.56348 19.25V46.75C7.56348 53.2048 12.7961 58.4375 19.251 58.4375H46.751C53.2058 58.4375 58.4385 53.2048 58.4385 46.75V19.25C58.4385 12.7952 53.2058 7.5625 46.751 7.5625Z",
                    stroke: props.stroke,
                    "stroke-width": 3.31731,
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M45.9557 24.6406C45.9557 23.5015 45.0323 22.5781 43.8932 22.5781H36.1149C34.9758 22.5781 34.0524 23.5015 34.0524 24.6406C34.0524 25.7797 34.9758 26.7031 36.1149 26.7031H38.9138L32.2706 33.3464L28.3368 29.4126C27.5313 28.6071 26.2254 28.6071 25.42 29.4126L16.6695 38.1631C15.8641 38.9685 15.8641 40.2745 16.6695 41.08C17.475 41.8855 18.7809 41.8855 19.5864 41.08L26.8784 33.7878L30.812 37.7217C31.6175 38.5272 32.9235 38.5272 33.729 37.7217L41.8307 29.6199V32.4189C41.8307 33.5579 42.7542 34.4814 43.8932 34.4814C45.0323 34.4814 45.9557 33.5579 45.9557 32.4189V24.6406Z",
                    stroke: props.stroke,
                    "stroke-width": 3.31731,
                    fill: "none",
                    "fill-rule": "evenodd",
                    "clip-rule": "evenodd",
                  },
                }),
              ]
            ),
        },
        analytics: {
          render: (h) =>
            h(
              "svg",
              {
                attrs: {
                  width: 66,
                  height: 66,
                  viewBox: "0 0 66 66",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                h("path", {
                  attrs: {
                    d: "M46.75 7.5625H19.25C12.7952 7.5625 7.5625 12.7952 7.5625 19.25V46.75C7.5625 53.2048 12.7952 58.4375 19.25 58.4375H46.75C53.2048 58.4375 58.4375 53.2048 58.4375 46.75V19.25C58.4375 12.7952 53.2048 7.5625 46.75 7.5625Z",
                    stroke: props.stroke,
                    "stroke-width": 3.31731,
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M22.6875 32.3125V44.6875",
                    stroke: props.stroke,
                    "stroke-width": 3.31731,
                    "stroke-linecap": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M33.6875 21.3125V44.6875",
                    stroke: props.stroke,
                    "stroke-width": 3.31731,
                    "stroke-linecap": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M44.6875 29.5625V44.6875",
                    stroke: props.stroke,
                    "stroke-width": 3.31731,
                    "stroke-linecap": "round",
                  },
                }),
              ]
            ),
        },
        settings: {
          render: (h) =>
            h(
              "svg",
              {
                attrs: {
                  width: 66,
                  height: 66,
                  viewBox: "0 0 66 66",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                h("path", {
                  attrs: {
                    d: "M7.97665 21.3345L10.3966 17.1429C11.8266 14.6661 15.0335 13.7867 17.5341 15.2305C21.8448 17.7192 25.3671 15.6883 25.3587 10.698C25.3577 7.83958 27.7049 5.4794 30.5869 5.49224L36.0685 5.51322C38.596 5.48014 40.6404 7.54949 40.6734 10.0772L40.6742 10.6809C40.6588 15.6575 44.1835 17.6925 48.5095 15.2047L49.0325 14.9034C51.2383 13.6682 54.0524 14.4039 55.2877 16.6095L58.0465 21.346C59.4988 23.8356 58.6284 27.0483 56.1523 28.4767C51.8263 30.9647 51.8287 35.0305 56.1394 37.5193C58.6163 38.9493 59.4957 42.1561 58.052 44.6566L55.632 48.8482C54.202 51.3251 50.9949 52.2046 48.4944 50.7608C44.1837 48.2721 40.6613 50.3029 40.6698 55.2931C40.6571 58.1754 38.3238 60.5118 35.4415 60.4991L29.9602 60.4779C27.4325 60.5112 25.3882 58.4418 25.3552 55.914L25.3544 55.3104C25.3698 50.3337 21.845 48.2987 17.5191 50.7867L16.9959 51.0878C14.7903 52.3231 11.9761 51.5875 10.7409 49.3817L7.98201 44.6454C6.52976 42.1555 7.40025 38.943 9.87616 37.5143C14.2021 35.0267 14.1998 30.9608 9.88914 28.4721C7.38848 27.0283 6.54665 23.8113 7.97665 21.3345Z",
                    stroke: props.stroke,
                    "stroke-width": 3.3125,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-miterlimit": 10,
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M41.9375 33C41.9375 28.064 37.936 24.0625 33 24.0625C28.064 24.0625 24.0625 28.064 24.0625 33C24.0625 37.936 28.064 41.9375 33 41.9375C37.936 41.9375 41.9375 37.936 41.9375 33Z",
                    stroke: props.stroke,
                    "stroke-width": 3.3125,
                  },
                }),
              ]
            ),
        },
        apps: {
          render: (h) =>
            h(
              "svg",
              {
                attrs: {
                  width: 66,
                  height: 66,
                  viewBox: "0 0 66 66",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                h("rect", {
                  attrs: {
                    x: 10,
                    y: 10,
                    width: 18,
                    height: 18,
                    rx: 4,
                    stroke: props.stroke,
                    "stroke-width": 3,
                  },
                }),
                h("rect", {
                  attrs: {
                    x: 38,
                    y: 10,
                    width: 18,
                    height: 18,
                    rx: 4,
                    stroke: props.stroke,
                    "stroke-width": 3,
                  },
                }),
                h("rect", {
                  attrs: {
                    x: 10,
                    y: 38,
                    width: 18,
                    height: 18,
                    rx: 4,
                    stroke: props.stroke,
                    "stroke-width": 3,
                  },
                }),
                h("rect", {
                  attrs: {
                    x: 38,
                    y: 38,
                    width: 18,
                    height: 18,
                    rx: 4,
                    stroke: props.stroke,
                    "stroke-width": 3,
                  },
                }),
              ]
            ),
        },
        plans: {
          render: (h) =>
            h(
              "svg",
              {
                attrs: {
                  width: 66,
                  height: 66,
                  viewBox: "0 0 66 66",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                h("rect", {
                  attrs: {
                    x: 10,
                    y: 10,
                    width: 46,
                    height: 46,
                    rx: 6,
                    stroke: props.stroke,
                    "stroke-width": 3,
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M20 24H46",
                    stroke: props.stroke,
                    "stroke-width": 3,
                    "stroke-linecap": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M20 34H46",
                    stroke: props.stroke,
                    "stroke-width": 3,
                    "stroke-linecap": "round",
                  },
                }),
                h("path", {
                  attrs: {
                    d: "M20 44H38",
                    stroke: props.stroke,
                    "stroke-width": 3,
                    "stroke-linecap": "round",
                  },
                }),
              ]
            ),
        },
      };
      return map[this.type] || map.dashboard;
    },
  },
};
</script>

<style scoped></style>
