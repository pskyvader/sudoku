import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
import Text, { LanguageProvider } from './languages/Language';
import ServiceWorkerProvider from './ContextProviders/ServiceWorkerContext';
import ThemeProvider from './ContextProviders/ThemeContext';
import BoardProvider from './ContextProviders/BoardContext';


const Home = lazy(() => import('./pages/Home'));
const ServiceWorker = lazy(() => import('./components/buttons/ServiceWorker'));

const renderLoader = () => Text("loading");
function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <ServiceWorkerProvider>
                    <BoardProvider>
                        <Header>
                            <Suspense fallback={renderLoader()}>
                                <Home />
                            </Suspense>
                        </Header>
                    </BoardProvider>
                    <Suspense fallback={renderLoader()}>
                        <ServiceWorker />
                    </Suspense>
                </ServiceWorkerProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
