import {Composition} from 'remotion';
import {ComponentBrowser} from './component-browser/ComponentBrowser';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ComponentBrowser"
        component={ComponentBrowser}
        durationInFrames={1320}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
