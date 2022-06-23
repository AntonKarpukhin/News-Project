import {useCallback, useState} from "react";

export const useHttp = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean | null | string>(null);

	const request = useCallback ( async function<T> (url: string, method = 'GET', body = null)  {

		setLoading(true);

		try {
			const response = await fetch(url, {method, body});

			if (!response.ok) throw new Error('Error')


			const data : T = await response.json();

			setLoading(false);

			return await data;


		} catch (err) {
			setLoading(false);
			if (err instanceof Error) {
				setError(err.message);
				throw err;
			}
		}

	},[])


	const clearError = useCallback(() => setError(null), []);

	const opened = (url: string) => {
		return window.open(url, '_blank');
	}


	return  {loading, error, request, clearError, opened}
}