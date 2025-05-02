// hooks/useENSLookup.ts
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

type ENSResult = {
  isEthTaken: boolean;
  isBaseEthTaken: boolean;
  matchingTakenNames: string[];
};

const ENS_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';

const fetchENSData = async (query: string): Promise<ENSResult> => {
  const graphqlQuery = `
    {
      domains(where: {
        name_in: ["${query}.eth", "${query}.base.eth"]
      }) {
        name
      }

      matches: domains(first: 10, where: {
        name_starts_with: "${query}"
      }) {
        name
      }
    }
  `;

  const res = await fetch(ENS_SUBGRAPH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: graphqlQuery }),
  });

  const json = await res.json();

  const domains = json.data.domains.map((d: any) => d.name);
  const matches = json.data.matches.map((d: any) => d.name);

  return {
    isEthTaken: domains.includes(`${query}.eth`),
    isBaseEthTaken: domains.includes(`${query}.base.eth`),
    matchingTakenNames: matches,
  };
};

export const useENSLookup = (input: string) => {
  const [result, setResult] = useState<ENSResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!input || input.length < 3) {
      setResult(null);
      return;
    }

    const fetchDebounced = debounce(async () => {
      setLoading(true);
      const data = await fetchENSData(input);
      setResult(data);
      setLoading(false);
    }, 300); // debounce to reduce calls

    fetchDebounced();

    return () => fetchDebounced.cancel();
  }, [input]);

  return { result, loading };
};
