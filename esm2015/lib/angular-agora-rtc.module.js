/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { AgoraLocalComponent } from './agora-local.component';
import { AngularAgoraRtcService } from './angular-agora-rtc.service';
import { CommonModule } from '@angular/common';
export class AngularAgoraRtcModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: AngularAgoraRtcModule,
            providers: [AngularAgoraRtcService, { provide: 'config', useValue: config }]
        };
    }
}
AngularAgoraRtcModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [AgoraLocalComponent],
                exports: [AgoraLocalComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1hZ29yYS1ydGMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hZ29yYS1ydGMvIiwic291cmNlcyI6WyJsaWIvYW5ndWxhci1hZ29yYS1ydGMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFTL0MsTUFBTTs7Ozs7SUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQW1CO1FBQ2hDLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsU0FBUyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQztTQUMzRSxDQUFDO0tBQ0g7OztZQWJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7YUFDL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWdvcmFMb2NhbENvbXBvbmVudCB9IGZyb20gJy4vYWdvcmEtbG9jYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEFnb3JhQ29uZmlnIH0gZnJvbSAnLi9BZ29yYUNvbmZpZyc7XG5pbXBvcnQgeyBBbmd1bGFyQWdvcmFSdGNTZXJ2aWNlIH0gZnJvbSAnLi9hbmd1bGFyLWFnb3JhLXJ0Yy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQWdvcmFMb2NhbENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtBZ29yYUxvY2FsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyQWdvcmFSdGNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEFnb3JhQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyc3tcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJBZ29yYVJ0Y01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0FuZ3VsYXJBZ29yYVJ0Y1NlcnZpY2UsIHtwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZ31dXG4gICAgfTtcbiAgfVxuIH1cbiJdfQ==