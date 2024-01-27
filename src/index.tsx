/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from "@solidjs/router";

import './index.css'
import Demo1 from './Demo1'
import Demo2 from './Demo2'

const root = document.getElementById('root')

render(
  () => (
    <Router>
      <Route path="/demo1" component={Demo1} />
      <Route path="/demo2" component={Demo2} />
    </Router>
  ),
  root!
)
