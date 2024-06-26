import { useRegisterSW } from 'virtual:pwa-register/react';

import './ReloadPrompt.css'

const UPDATE_CHECK_INTERVAL = 20000;

function ReloadPrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl,r ) {
            // eslint-disable-next-line prefer-template
            console.log('SW Registered: ' + swUrl);
            r && setInterval(async () => {
                console.log('Refresh Checker: checking for update');
                await r.update();
            }, UPDATE_CHECK_INTERVAL);
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
        onNeedRefresh() {
            console.log('need refresh', needRefresh);
        }
    })

    const close = () => {
        setNeedRefresh(false)
    }

    return (
        <div className="ReloadPrompt-container">
            { needRefresh
                && <div className="ReloadPrompt-toast">
                    <div className="ReloadPrompt-message">
                        <span>New content available, click on reload button to update.</span>
                    </div>
                    { needRefresh && <button className="ReloadPrompt-toast-button" onClick={() => updateServiceWorker(true)}>Reload</button> }
                    <button className="ReloadPrompt-toast-button" onClick={() => close()}>Close</button>
                </div>
            }
        </div>
    )
}

export default ReloadPrompt
