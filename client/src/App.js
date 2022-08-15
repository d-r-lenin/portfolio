import './css/app.css';
import Header from "./components/Header.parts/Header";
import { useMediaQuery } from 'react-responsive';
import GlobleC from './context';

function App() {
	const isMobileDevice = useMediaQuery({
		query: "(max-device-width: 770px)"
	});;

	return (
	<GlobleC.Provider value={ { isMobileDevice } }>
		<div className="wrapper">
			<Header />
		</div>
	</GlobleC.Provider>
	);
}

export default App;