/**
 * Chartist.js plugin to display a target line on a chart.
 * With code from @gionkunz in https://github.com/gionkunz/chartist-js/issues/235
 * and @OscarGodson in https://github.com/gionkunz/chartist-js/issues/491.
 * Based on https://github.com/gionkunz/chartist-plugin-pointlabels
 */
/* global Chartist */
( function( window, document, Chartist ) {
    'use strict';

    var defaultOptions = {
        class: 'ct-target-line',
        value: null,
        axis: 'y'
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctTargetLine = function( options ) {

        options = Chartist.extend( {}, defaultOptions, options );

        return function ctTargetLine( chart ) {
            function projectY( chartRect, bounds, value ) {
                if (value === -1) {
                    return chartRect.y1 + chartRect.height();
                }
                return chartRect.y1 - ( chartRect.height() / bounds.max * value )
            }

            function projectX( chartRect, bounds, value ) {
                if (value === -1) {
                    return chartRect.x1 + chartRect.width();
                }
                return chartRect.x1 + ( chartRect.width() / bounds.max * value )
            }


            chart.on( 'created', function( context ) {
                if ( options.axis === "y" ) {
                    var targetLineY = projectY( context.chartRect, context.bounds, options.value );

                    context.svg.elem( 'line', {
                        x1: context.chartRect.x1,
                        x2: context.chartRect.x2,
                        y1: targetLineY,
                        y2: targetLineY
                    }, options.class );

                } else {
                    var targetLineX = projectX( context.chartRect, context.bounds, options.value );

                    context.svg.elem( 'line', {
                        x1: targetLineX,
                        x2: targetLineX,
                        y1: context.chartRect.y1,
                        y2: context.chartRect.y2
                    }, options.class );
                }

            } );
        };
    };
}( window, document, Chartist ) );
