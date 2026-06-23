import {Composition} from 'remotion';
import {ComponentBrowser, COMPONENT_BROWSER_DURATION} from './component-browser/ComponentBrowser';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ComponentBrowser"
        component={ComponentBrowser}
        durationInFrames={COMPONENT_BROWSER_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
