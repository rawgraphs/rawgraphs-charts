import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import ChartPage from "./components/ChartPage"
import ChartList from "./components/ChartList"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/:confName" component={ChartPage} />
        <Route exact path="/" render={() => {
          return (
            <ChartList />
          )
        }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App