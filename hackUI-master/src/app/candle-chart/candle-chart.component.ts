import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

// declaration so Typescript knows about the TradingView object loaded in from index.html
declare const TradingView: any;

@Component( {
  selector: 'rip-trading-view-symbol-overview',
  template: `
      <div #containerDiv id="overview_{{symbol}}" class="tradingview-widget-container" style="height: 300px;"></div>
  `,
} )

export class CandleChartComponent implements AfterViewInit {

  chart: any;
  // allows for loading with any symbol and description
  @Input() symbol: string = '';
  @Input() description: string = '';
  // id for being able to check for errors using postMessage
  widgetId: string = '';

  // wanted to be able to hide the widget if the symbol passed in was invalid (don't love their sad cloud face)
  @ViewChild('containerDiv', { static: false })
  containerDiv!: ElementRef;

  ngAfterViewInit() {
    // need to do this in AfterViewInit because of the Input
    setTimeout( () => {
      this.widgetId = `overview_${ this.symbol }`;

      // postMessage listener for handling errors
      if ( window.addEventListener ) {
        window.addEventListener( 'message', ( e: any ) => {
            if ( e && e.data ) {
              console.log( e );
              const payload = e.data;
              if (
                // if the frameElementId is from this component, the symbol was no good and we should hide the widget
                payload.name === 'tv-widget-no-data' && payload.frameElementId === this.widgetId ) {
                // console.log( 'No data available for the symbol profile widget' );
                this.containerDiv.nativeElement.style.display = 'none';
              }
            }
          },
          false,
        );
      }


      this.chart = new TradingView.widget( {
        container_id: this.widgetId,
        symbols: [
          [
            this.description,
            this.symbol,
          ],
          // could load more symbols, but we just needed the one at a time for now
          // [
          //   'Google',
          //   'GOOGL',
          // ],
          // [
          //   'Microsoft',
          //   'MSFT',
          // ],
        ],
        id: this.widgetId,
        chartOnly: false,
        // 'width': 1000,
        height: 300,
        autosize: true,
        locale: 'en',
        colorTheme: 'light',
        gridLineColor: '#F0F3FA',
        trendLineColor: '#1b66ae',
        fontColor: '#787B86',
        underLineColor: 'rgba(145,196,242,0.35)',
        isTransparent: false,
      } );
    } );
  }

}
