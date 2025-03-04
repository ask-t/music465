import { musc465Unit1 } from './musc465-unit1';
// 将来的に他のコースも追加可能
import { musc465Unit2 } from './musc465-unit2';

export const courses = [musc465Unit1, musc465Unit2];

export const getAllSongs = () => {
  return courses.flatMap(course => course.songs);
};

export const getSongsByCourse = (courseId) => {
  const course = courses.find(c => c.id === courseId);
  return course ? course.songs : [];
};

export const getComposersByCourse = (courseId) => {
  const songs = courseId === 'all' ? getAllSongs() : getSongsByCourse(courseId);
  const uniqueComposers = [...new Set(songs.map(song => song.composer))];
  return ['all', ...uniqueComposers];
}; 