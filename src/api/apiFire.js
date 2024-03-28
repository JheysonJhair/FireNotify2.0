export const fetchFireLocations = async () => {
  try {
    const response = await fetch(
      'https://satlled.ccontrolz.com/satelite/getSatellite',
    );
    const json = await response.json();
    const filteredLocations = json.value.filter(
      location => location.temperature > 60,
    );
    return filteredLocations;
  } catch (error) {
    console.error('Error fetching dataxd:', error);
    return [];
  }
};

export const fetchData = async () => {
  try {
    const response = await fetch(
      'https://satlled.ccontrolz.com/satelite/conflagration',
    );
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const fetchData2 = async () => {
  try {
    const response = await fetch(
      'https://satlled.ccontrolz.com/satelite/recentFires',
    );
    const data = await response.json();
    return data.value;
  } catch (error) {
    return [];
  }
};
