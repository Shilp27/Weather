import React, { useState, useEffect } from 'react';

const SearchWeather = () => {
  const [search, setSearch] = useState('london');
  const [data, setData] = useState();
  const [input, setInput] = useState('');
  const [imgUrl, setImgUrl] = useState('https://picsum.photos/600/900');

  try {
    useEffect(() => {
      const fetchWeather = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b6ba27c7478167768ff1951e7aee78ae`
        );
        setData(await response.json());
      };
      fetchWeather();
    }, [search]);
  } catch (err) {
    return <h1>API failed</h1>;
  }

  if (data === undefined) {
    return (
      <>
        <div class='d-flex justify-content-center'>
          <div class='spinner-border text-primary' role='status'>
            <span class='visually-hidden'>Loading...</span>
          </div>
        </div>
      </>
    );
  }
  let icon = null;
  if (data.weather[0].main === 'Clouds') {
    icon = 'fa-cloud';
  } else if (data.weather[0].main === 'Thunderstorm') {
    icon = 'fa-bolt';
  } else if (data.weather[0].main === 'Drizzle') {
    icon = 'fa-cloud-rain';
  } else if (data.weather[0].main === 'Rain') {
    icon = 'fa-cloud-shower-heavy';
  } else if (data.weather[0].main === 'Snow') {
    icon = 'fa-snow-flake';
  } else {
    icon = 'fa-smog';
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString('default', { month: 'long' });
  let day = d.toLocaleString('default', { weekday: 'long' });

  let time = d.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
    setImgUrl('https://picsum.photos/600/900');
  };

  return (
    <>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            <div className='card text-white text-center border-0'>
              <img src={imgUrl} className='card-img' alt='weather' />
              <div className='card-img-overlay'>
                <form onSubmit={handleSubmit}>
                  <div className='input-group mb-4 w-75 mx-auto'>
                    <input
                      type='search'
                      className='form-control placeholder-glow bg-light placeholder-wave'
                      placeholder='Search City'
                      aria-label='Search City'
                      aria-describedby='basic-addon2'
                      name='search'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                      type='submit'
                      className='input-group-text'
                      id='basic-addon2'
                    >
                      <i className='fas fa-search'></i>
                    </button>
                  </div>
                </form>
                <div className='bg-dark bg-opacity-50 py-3'>
                  <h2 className='card-title'>{data.name}</h2>
                  <p className='card-text lead'>
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <i className={`fas ${icon} fa-4x`}></i>
                  <h1 className='fw-bolder mb-5'>{temp} &deg;C</h1>
                  <p className='lead fw-bolder mb-0'>{data.weather[0].main}</p>
                  <p className='lead'>
                    {temp_min} &deg;C | {temp_max} &deg;C
                  </p>
                  <hr />
                  <p className='lead mb-0'>Wind Speed: {data.wind.speed}</p>
                  <p className='lead mb-0'>Humidity: {data.main.humidity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchWeather;
