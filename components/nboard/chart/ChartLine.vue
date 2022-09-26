<script>
import { Line, mixins } from "vue-chartjs";
import Chart from "chart.js";
import { defaultsDeep } from "lodash";
import hexToRgba from "hex-to-rgba";

Chart.defaults.global.defaultFontFamily = "Mukta, sans-serif";

export default {
  name: "NChartLine",
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      setGradientCount: 0,
      defaultOptions: {
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "transparent",
                display: true,
                drawBorder: false,
                zeroLineColor: "#fff",
                lineWidth: 0,
                zeroLineWidth: 1,
              },
            },
          ],
          yAxes: [
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
              ticks: {},
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
    computedDatasets() {
      return this.chartData.datasets || [];
    },
    computedOptions() {
      return defaultsDeep(this.options, this.defaultOptions);
    },
  },
  watch: {
    computedDatasets: {
      deep: false,
      handler() {
        this.setGradient();
      },
    },
    computedData: {
      deep: false,
      handler() {
        this.$data._chart.update();
      },
    },
  },
  mounted() {
    this.renderChart(this.computedData, this.computedOptions);
  },
  methods: {
    setGradient() {
      this.computedDatasets.forEach((dataset, index) => {
        if (
          dataset.gradientBackground &&
          this.setGradientCount <= this.computedData.datasets.length
        ) {
          const parentHeight = this.$refs.canvas.parentNode.clientHeight;
          const y1 = parentHeight * 1.5;
          const gradient = this.$refs.canvas
            .getContext("2d")
            .createLinearGradient(0, 0, 0, y1);

          gradient.addColorStop(0, hexToRgba(dataset.borderColor, "0.4"));
          gradient.addColorStop(0.5, hexToRgba("#fff", "0.3"));
          gradient.addColorStop(1, hexToRgba("#fff", "0.2"));

          this.computedData.datasets[index].fill = true;
          this.computedData.datasets[index].backgroundColor = gradient;
          this.setGradientCount++;
        }
      });
    },
  },
};
</script>
