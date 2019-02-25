/* global document */

import React from 'react';

export default class TopPanel extends React.Component {
    switchToFullscreen() {
        document.body.requestFullscreen();
    }

    exitFullscreen() {
        document.exitFullscreen();
    }

    render() {
        return (
            <div id="top-panel" className="horizontal-panel">
                <div id="top-panel-head" className="panel-head">
                    <div
                        id="top-panel-progress-bar"
                        style={{
                            width: this.props.presentation.presentationProgress + '%'
                        }}
                    />
                    <span id="top-presentation-title-text">
                        {
                            this.props.presentation.title
                        }
                    </span>
                    <div className="panel-controls-group panel-controls-group-right">
                        <div
                            className={'control-button smaller fa fa-close blue' + (!this.props.presentation.isPresentationLoaded || !this.props.presentation.controlMode ? ' offsetted' : '') + (!this.props.presentation.isPresentationLoaded ? ' hidden' : '')}
                            onClick={() => this.props.setControlMode(null)}
                            title="Close"
                        />
                        <div
                            className={'control-button smaller fa fa-gear' + (!this.props.presentation.isPresentationLoaded ? ' hidden' : '')}
                            onClick={() => this.props.setControlMode('presentation')}
                            title="Set presentation preferences"
                        />
                        <div
                            className={'control-button smaller fa fa-chain' + (!this.props.presentation.isPresentationLoaded ? ' hidden' : '') + (this.props.presentation.isControllerConnected ? ' active' : '')}
                            onClick={() => this.props.setControlMode('control')}
                            title={this.props.presentation.isControllerConnected ? 'A controller is connected' : 'Connect a controller'}
                        />
                        <div
                            className={'control-button smaller fa fa-arrows-alt' + (!this.props.presentation.isPresentationLoaded || this.props.presentation.isFullscreen ? ' hidden' : '')}
                            onClick={() => this.switchToFullscreen()}
                            title="Switch to Fullscreen"
                        />
                        <div
                            className={'control-button smaller fa fa-window-restore' + (!this.props.presentation.isPresentationLoaded || !this.props.presentation.isFullscreen ? ' hidden' : '')}
                            onClick={() => this.exitFullscreen()}
                            title="Exit Fullscreen"
                        />
                        <div
                            className={'control-button smaller fa fa-stop red' + (!this.props.presentation.isPresentationLoaded ? ' hidden' : '')}
                            onClick={() => this.props.endPresentation()}
                            title="End presentation"
                        />
                        <div
                            className={'control-button smaller' + (this.props.presentation.isPresentationLoaded ? ' hidden' : '')}
                            onClick={() => this.props.backToHome()}>
                            Go Back
                        </div>
                    </div>
                </div>
                <div id="top-panel-body" className={'panel-body' + (this.props.presentation.controlMode ? ' active' : '')}>
                    <div className={'top-panel-body-content' + (this.props.presentation.controlMode === 'presentation' ? ' visible' : '')}>
                        <div className="controls-header">
                            Presentation
                        </div>
                        <div
                            className={'control-button' + (!this.props.presentation.isPresentationLoaded ? ' hidden' : '') + (this.props.presentation.isAutoTransitionEnabled ? ' active' : '')}
                            onClick={() => this.props.toggleAutoTransition()}>
                            Auto-Transition
                        </div>
                        <div
                            id="auto-transition-controls"
                            className={(!this.props.presentation.isAutoTransitionEnabled ? ' disabled' : '')}>
                            <input
                                type="range"
                                name="auto-transition-delay"
                                min="1"
                                max="12"
                                value={this.props.presentation.autoTransitionDelay}
                                onChange={(e) => this.props.onAutoTransitionDelayChange(e)}
                                disabled={!this.props.presentation.isAutoTransitionEnabled}
                            />
                            &nbsp;
                            <span>
                                {
                                    this.props.presentation.autoTransitionDelay * 5
                                }
                                &nbsp;seconds
                            </span>
                        </div>
                        <div className="controls-header">
                            Slide-transition Animation
                        </div>
                        {
                            [
                                'none',
                                'fade',
                                'scroll-down',
                                'scroll-right',
                                'zoom',
                                'flip',
                                'cube',
                                'cube-inverse',
                                'carousel'
                            ].map(animation =>
                                (
                                    <div
                                        key={animation}
                                        className={'control-button' + (this.props.presentation.animation === animation ? ' active' : '')}
                                        onClick={() => this.props.setAnimation(animation)}>
                                        {
                                            animation
                                                .slice(0, 1)
                                                .toUpperCase()
                                            + animation.slice(1)
                                        }
                                    </div>
                                ))
                        }
                    </div>
                    <div className={'top-panel-body-content' + (this.props.presentation.controlMode === 'control' ? ' visible' : '')}>
                        <div className="controls-header">
                            Remotely control this presentation
                        </div>
                        <div
                            id="qr-code-image"
                            style={{
                                backgroundImage: 'url(' + this.props.presentation.controllerUrlQrCodeData + ')'
                            }}
                        />
                        <div>
                            <a
                                id="controller-url-link"
                                href={this.props.configs['web-protocol'] + '://' + this.props.configs.domain + '/control/' + this.props.presentation.presentationCode}
                                target="_blank">
                                {
                                    this.props.configs['web-protocol'] + '://' + this.props.configs.domain + '/control/' + this.props.presentation.presentationCode
                                }
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}