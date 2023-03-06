import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { Project } from '../pages/Project';

export function Router() {
  return (
    <Routes>
      <Route path="/" >
        <Route element={<Home />} path="/" />
        <Route element={<Project />} path="/project" />
      </Route>
    </Routes>
  )
}