import { SoundProps } from './@core/Sound';

import eating from './assets/sfx/eating.wav';
import drinking from './assets/sfx/drinking.wav';
import footstep from './assets/sfx/footstep.wav';

const soundData: { [index: string]: SoundProps } = {
  eating: {
    // "Chewing" by InspectorJ - freesound.org
    src: eating,
  },
  drinking: {
    // "Drinking" by dersuperanton - freesound.org"
    src: drinking,
  },
  footstep: {
    src: footstep,
    volume: 0.75,
  },
};

export default soundData;
