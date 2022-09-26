<script>
import { defaultsDeep } from "lodash";
import { HorizontalBar, mixins } from "vue-chartjs";
import hexToRgba from "hex-to-rgba";
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "Mukta, sans-serif";

export default {
  name: "NChartHorizontalBar",
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    chartData: {
      type: Object,
      default() {
        return {
          labels: [],
          datasets: [],
        };
      },
    },
  },
  data() {
    return {
      defaultOptions: {
        scales: {
          xAxes: [
            {
              gridLines: {
                color: hexToRgba("#000", "0.1"),
                borderDash: [5, 5],
                drawBorder: false,
                lineWidth: 1,
                zeroLineColor: hexToRgba("#000", "0.1"),
                zeroLineBorderDash: [5, 5],
                zeroLineWidth: 1,
              },
              ticks: {
                autoSkip: true,
                stepSize: 1000,
                beginAtZero: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: "transparent",
                display: true,
                drawBorder: true,
                zeroLineColor: "#fff",
                lineWidth: 0,
                zeroLineWidth: 1,
              },
              ticks: {
                padding: 10,
                autoSkip: false,
                stepSize: 1,
              },
            },
          ],
        },
        tooltips: {
          callbacks: {},
          backgroundColor: "#fbfbfb",
          titleFontColor: "#313131",
          bodyFontColor: "#313131",
          footerFontColor: "#313131",
          borderWidth: 1,
          borderColor: "#e1e1e1",
        },
        legend: {
          display: false,
        },
        fixedHeight: true,
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    computedData: {
      set(value) {
        return value;
      },
      get() {
        return this.chartData;
      },
    },
    computedOptions() {
      return defaultsDeep(this.options, this.defaultOptions);
    },
  },
  watch: {
    computedData: {
      deep: false,
      handler() {
        this.$data._chart.update();
        this.setFixedHeight();
      },
    },
  },
  mounted() {
    this.setFixedHeight();
    this.renderChart(this.computedData, this.computedOptions);
  },
  methods: {
    setFixedHeight() {
      if (this.options.fixedHeight && this.computedData.datasets[0]) {
        if (this.computedData.labels.length >= 10) {
          const height = this.computedData.datasets[0].data.length * 25;
          this.$refs.canvas.parentNode.style.height = height + "px";
        }
      }
    },
  },
};
</script>
