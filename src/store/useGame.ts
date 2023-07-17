import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Phase } from '../types';

type Store = {
  blocksCount: number;
  blocksSeed: number;
  phase: Phase;
  start: () => void;
  restart: () => void;
  end: () => void;
  startTime: number;
  endTime: number;
}

export const useGame = create<Store>()(subscribeWithSelector((set) => ({
  blocksCount: 3,
  blocksSeed: 0,
  phase: Phase.ready,
  start: () => set((state) => {
    if (state.phase === Phase.ready) {
      return {phase: Phase.playing, startTime: Date.now()};
    }
    return {};
  }),
  restart: () => set((state) => {
    if (state.phase === Phase.playing || state.phase === Phase.ended) {
      return {phase: Phase.ready, blocksSeed: Math.random()};
    }
    return {};
  }),
  end: () => set((state) => {
    if (state.phase === Phase.playing) {
      return {phase: Phase.ended, endTime: Date.now()};
    }
    return {};
  }),
  startTime: 0,
  endTime: 0
})));