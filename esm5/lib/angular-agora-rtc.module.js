/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { AgoraLocalComponent } from './agora-local.component';
import { AngularAgoraRtcService } from './angular-agora-rtc.service';
import { CommonModule } from '@angular/common';
var AngularAgoraRtcModule = /** @class */ (function () {
    function AngularAgoraRtcModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    AngularAgoraRtcModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: AngularAgoraRtcModule,
            providers: [AngularAgoraRtcService, { provide: 'config', useValue: config }]
        };
    };
    AngularAgoraRtcModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [AgoraLocalComponent],
                    exports: [AgoraLocalComponent]
                },] },
    ];
    return AngularAgoraRtcModule;
}());
export { AngularAgoraRtcModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1hZ29yYS1ydGMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hZ29yYS1ydGMvIiwic291cmNlcyI6WyJsaWIvYW5ndWxhci1hZ29yYS1ydGMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0lBVXRDLDZCQUFPOzs7O0lBQWQsVUFBZSxNQUFtQjtRQUNoQyxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUM7U0FDM0UsQ0FBQztLQUNIOztnQkFiRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7cUJBQ2I7b0JBQ0QsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQ25DLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUMvQjs7Z0NBWkQ7O1NBYWEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFnb3JhTG9jYWxDb21wb25lbnQgfSBmcm9tICcuL2Fnb3JhLWxvY2FsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZ29yYUNvbmZpZyB9IGZyb20gJy4vQWdvcmFDb25maWcnO1xuaW1wb3J0IHsgQW5ndWxhckFnb3JhUnRjU2VydmljZSB9IGZyb20gJy4vYW5ndWxhci1hZ29yYS1ydGMuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0Fnb3JhTG9jYWxDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQWdvcmFMb2NhbENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckFnb3JhUnRjTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBBZ29yYUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnN7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBbmd1bGFyQWdvcmFSdGNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtBbmd1bGFyQWdvcmFSdGNTZXJ2aWNlLCB7cHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBjb25maWd9XVxuICAgIH07XG4gIH1cbiB9XG4iXX0=