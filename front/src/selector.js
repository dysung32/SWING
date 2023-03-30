import { selector } from 'recoil';
import {
  userIdState,
  userNicknameState,
  userImgState,
  sentencyCntState,
  fiveCntState,
} from './atoms';

// export const toDoSelector = selector({
//     key: 'toDoSelector',
//     get: ({ get }) => {
//       const toDos = get(toDoState);
//       return [
//         toDos.filter((toDo) => toDo.category === 'TO_DO'),
//         toDos.filter((toDo) => toDo.category === 'DOING'),
//         toDos.filter((toDo) => toDo.category === 'DONE'),
//       ];
//     },
//   });
