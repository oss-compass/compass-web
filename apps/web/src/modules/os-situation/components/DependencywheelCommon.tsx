import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import type { CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import useInViewportDebounce from '@common/hooks/useInViewportDebounce';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export interface HighchartsDependencyWheelProps {
  data: any[]; // Highcharts 的数据通常直接传入 series.data
  style?: CSSProperties;
  loading?: boolean;
  containerRef?: React.RefObject<HTMLElement>;
  _tracing?: string;
}
const loadHighchartsModules = async (callback) => {
  Promise.all([
    import('highcharts/modules/map'),
    import('highcharts/modules/sankey'),
    import('highcharts/modules/dependency-wheel'),
    import('highcharts/modules/exporting'),
    import('highcharts/modules/accessibility'),
  ]).then(callback);
};
const DependencywheelCommon: React.FC<HighchartsDependencyWheelProps> = ({
  data,
  style,
  loading,
  containerRef,
}) => {
  const inView = useInViewportDebounce(containerRef);
  const chartRef = useRef(null);

  // Highcharts 配置
  // const options = {
  //   title: {
  //     text: "<img style='width:100px;heigth:15px' src='https://raw.githubusercontent.com/oss-compass/document-website/626c46cececc42e4a87c13c86ed1ea84d456f980/static/img/compass-gray.svg' />",
  //     useHTML: true,
  //     align: 'right',
  //     verticalAlign: 'bottom',
  //   },
  //   accessibility: {
  //     point: {
  //       valueDescriptionFormat:
  //         '{index}. From {point.from} to ' + '{point.to}: {point.weight}.',
  //     },
  //   },
  //   series: [
  //     {
  //       keys: ['from', 'to', 'weight'],
  //       data: data,
  //       type: 'dependencywheel',
  //       name: '进出口贡献总量',
  //       dataLabels: {
  //         color: '#333',
  //         style: {
  //           textOutline: 'none',
  //         },
  //         textPath: {
  //           enabled: true,
  //         },
  //         distance: 10,
  //       },
  //       size: '80%',
  //     } as Highcharts.SeriesOptionsType,
  //   ],
  //   // 可以在这里添加其他 Highcharts 配置，例如 tooltip, plotOptions 等
  //   tooltip: {
  //     pointFormat: '{point.from} → {point.to}: <b>{point.weight}</b>',
  //   },
  //   credits: {
  //     enabled: false, // 禁用 Highcharts 官网链接
  //   },
  // };
  const [options, setOptions] = useState(null);
  useEffect(() => {
    if (!loading) {
      loadHighchartsModules(() => {
        (
          Highcharts as any
        ).SeriesRegistry.seriesTypes.dependencywheel.prototype.pointClass.prototype.getDataLabelPath =
          function (a) {
            var c = this.series.chart.renderer,
              f = this.shapeArgs,
              e = 0 > this.angle || this.angle > Math.PI,
              g = f.start,
              b = f.end;
            // Create a dummy text element to get the bounding box width
            const textContent = this.id || this.name || 'Sample';
            const fontSize = a.text?.styles?.fontSize || '12px';
            const fontWeight = a.text?.styles?.fontWeight || 'normal';

            let tmpText = c
              .text(textContent)
              // Set the appropriate text styles so that we get an accurate bounding box
              .attr({
                style:
                  'font-size: ' + fontSize + '; font-weight: ' + fontWeight,
              })
              // We don't get the real box until it's been added
              .add();
            var width = tmpText.getBBox().width;
            // Clean up the dummy text element
            tmpText.destroy();

            const createOrUpdateRadialPath = (
              point,
              renderer,
              shapeArgs,
              angle,
              labelWidth,
              labelOptions
            ) => {
              const x =
                (shapeArgs.r +
                  (point.series.options.dataLabels.distance / 2 || 0)) *
                  Math.cos(angle) +
                shapeArgs.x;
              const y =
                (shapeArgs.r +
                  (point.series.options.dataLabels.distance / 2 || 0)) *
                  Math.sin(angle) +
                shapeArgs.y;
              const p1 = [Math.round(x), Math.round(y)];
              const p2 = [
                Math.round(x + Math.cos(angle) * labelWidth),
                Math.round(y + Math.sin(angle) * labelWidth),
              ];
              const isUpperHalf = -Math.PI / 2 > angle || angle > Math.PI / 2;
              const svgPath = isUpperHalf
                ? ['M', p2[0], p2[1], 'L', p1[0], p1[1]]
                : ['M', p1[0], p1[1], 'L', p2[0], p2[1]];

              if (shapeArgs.end - shapeArgs.start === 0) {
                labelOptions.options.enabled = false;
                console.log(
                  labelOptions,
                  shapeArgs.start,
                  shapeArgs.end,
                  point.shapeArgs,
                  point.dataLabel
                );
              }

              if (!point.dataLabelPath) {
                point.dataLabelPath = renderer.path(svgPath).add(labelOptions);
              } else {
                point.dataLabelPath.attr({
                  d: svgPath,
                });
              }
            };

            if (
              width <
              (f.r + (this.series.options.dataLabels.distance || 0)) * (b - g)
            ) {
              // safe for arc shapeArgs (enough space for labelling in the arc)
              this.dataLabelPath = c.arc({ open: !0 }).add(a);
              this.dataLabelPath.attr({
                x: f.x,
                y: f.y,
                r: f.r + (this.series.options.dataLabels.distance || 0),
                start: e ? g : b,
                end: e ? b : g,
                clockwise: +e,
              });
            } else {
              // go for radial
              createOrUpdateRadialPath(this, c, f, this.angle, width, a);
            }
            return this.dataLabelPath;
          };

        // (function (H) {
        //   H.wrap(
        //     H.seriesTypes.dependencywheel.prototype.pointClass.prototype,
        //     'getDataLabelPath',
        //     function (proceed, label) {

        //       var renderer = this.series.chart.renderer,
        //         shapeArgs = this.shapeArgs,
        //         upperHalf = this.angle < 0 || this.angle > Math.PI,
        //         start = shapeArgs.start,
        //         end = shapeArgs.end;
        //       if (!this.dataLabelPath) {
        //         this.dataLabelPath = renderer
        //           .arc({
        //             open: true,
        //             longArc: Math.abs(Math.abs(start) - Math.abs(end)) < Math.PI ? 0 : 1,
        //             x: shapeArgs.x,
        //             y: shapeArgs.y,
        //             r: (shapeArgs.r +
        //               (this.dataLabel.options.distance || 0)),
        //             start: (upperHalf ? start : end),
        //             end: (upperHalf ? end : start),
        //             clockwise: +upperHalf

        //           })
        //           // Add it inside the data label group so it gets destroyed
        //           // with the label
        //           .add(label);
        //       }
        //       this.dataLabelPath.attr({
        //         x: shapeArgs.x,
        //         y: shapeArgs.y,
        //         r: (shapeArgs.r +
        //           (this.dataLabel.options.distance || 0)),
        //         start: (upperHalf ? start : end),
        //         end: (upperHalf ? end : start),
        //         clockwise: +upperHalf
        //       });
        //       return this.dataLabelPath;

        //     }
        //   )
        // })(Highcharts)
        // Highcharts.seriesTypes.dependencywheel.prototype.pointClass.prototype.getDataLabelPath =
        //   function (a) {
        //     var c = this.series.chart.renderer,
        //       f = this.shapeArgs,
        //       e = 0 > this.angle || this.angle > Math.PI,
        //       g = f.start,
        //       b = f.end;
        //     // Create a dummy text element to get the bounding box width
        //     let tmpText = c
        //       .text(this.id)
        //       // Set the appropriate text styles so that we get an accurate bounding box
        //       .attr({
        //         style:
        //           "font-size: " +
        //           a.text.styles.fontSize +
        //           "; font-weight: " +
        //           a.text.styles.fontWeight,
        //       })
        //       // We don't get the real box until it's been added
        //       .add();
        //     var width = tmpText.getBBox().width;
        //     // Clean up the dummy text element
        //     tmpText.destroy();
        //     if (width < (f.r + (this.series.options.dataLabels.distance || 0)) * (b - g)) {
        //       // safe for arc shapeArgs (enough space for labelling in the arc)
        //       this.dataLabelPath = c.arc({ open: !0 }).add(a);
        //       this.dataLabelPath.attr({
        //         x: f.x,
        //         y: f.y,
        //         r: f.r + (this.series.options.dataLabels.distance || 0),
        //         start: e ? g : b,
        //         end: e ? b : g,
        //         clockwise: +e,
        //       });
        //     } else {
        //       // go for radial
        //       var x =
        //         (f.r + (this.series.options.dataLabels.distance / 2 || 0)) * Math.cos(this.angle) +
        //         f.x,
        //         y =
        //           (f.r + (this.series.options.dataLabels.distance / 2 || 0)) * Math.sin(this.angle) +
        //           f.y,
        //         p1 = [Math.round(x), Math.round(y)],
        //         p2 = [
        //           Math.round(x + Math.cos(this.angle) * width),
        //           Math.round(y + Math.sin(this.angle) * width),
        //         ];
        //       e = -Math.PI / 2 > this.angle || this.angle > Math.PI / 2;
        //       var svg_path = e
        //         ? ["M", p2[0], p2[1], "L", p1[0], p1[1]]
        //         : ["M", p1[0], p1[1], "L", p2[0], p2[1]];
        //       if (b - g === 0) {
        //         a.options.enabled = false;
        //         console.log(a, b, g, this.shapeArgs, this.dataLabel)
        //         this.dataLabel && (this.dataLabel.text = "")
        //       }
        //       if (!this.dataLabelPath) {
        //         this.dataLabelPath = c.path(svg_path).add(a);
        //       } else {
        //         this.dataLabelPath.attr({
        //           d: svg_path,
        //         });
        //       }
        //     }
        //     return this.dataLabelPath;
        //   };
        setOptions({
          // title: {
          //   text: "<img style='width:100px;heigth:15px' src='https://raw.githubusercontent.com/oss-compass/document-website/626c46cececc42e4a87c13c86ed1ea84d456f980/static/img/compass-gray.svg' />",
          //   useHTML: true,
          //   align: 'right',
          //   verticalAlign: 'bottom',
          // },
          title: {
            text: '',
          },
          accessibility: {
            point: {
              valueDescriptionFormat:
                '{index}. From {point.from} to ' +
                '{point.to}: {point.weight}.',
            },
          },
          series: [
            {
              keys: ['from', 'to', 'weight'],
              data: data,
              type: 'dependencywheel',
              name: '',
              dataLabels: {
                color: '#333',
                style: {
                  textOutline: 'none',
                },
                textPath: {
                  enabled: true,
                },
                distance: 10,
              },
              size: '80%',
            } as Highcharts.SeriesOptionsType,
          ],
          // 可以在这里添加其他 Highcharts 配置，例如 tooltip, plotOptions 等
          tooltip: {
            pointFormat: '{point.from} → {point.to}: <b>{point.weight}</b>',
          },
          credits: {
            enabled: false, // 禁用 Highcharts 官网链接
          },
        });
      });
    }
  }, [loading]);
  const onResize = useCallback(() => {
    if (chartRef.current) {
      // Highcharts.chart("container", {
      //   title: {
      //     text: "<img style='width:100px;heigth:15px' src='https://raw.githubusercontent.com/oss-compass/document-website/626c46cececc42e4a87c13c86ed1ea84d456f980/static/img/compass-gray.svg' />",
      //     useHTML: true,
      //     align: "right",
      //     verticalAlign: "bottom",
      //   },
      //   accessibility: {
      //     point: {
      //       valueDescriptionFormat:
      //         "{index}. From {point.from} to " + "{point.to}: {point.weight}.",
      //     },
      //   },
      //   series: [
      //     {
      //       keys: ["from", "to", "weight"],
      //       data: data,
      //       type: "dependencywheel",
      //       name: "进出口贡献总量",
      //       dataLabels: {
      //         color: "#333",
      //         style: {
      //           textOutline: "none",
      //         },
      //         textPath: {
      //           enabled: true,
      //         },
      //         distance: 10,
      //       },
      //       size: "80%",
      //     },
      //   ],
      // });
    }
  }, []);

  useResizeDetector({
    targetRef: containerRef,
    onResize,
    skipOnMount: true,
  });

  return (
    <div
      ref={chartRef}
      id="container"
      style={{ width: '100%', height: '100%', ...style }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        containerProps={{ style: { height: '100%' } }}
      />
    </div>
  );
};

export default React.memo(DependencywheelCommon);
