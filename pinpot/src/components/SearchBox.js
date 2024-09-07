import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import '../index.css';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';

function SearchBox(props) {
    const { setSelectPosition } = props;
    const [searchText, setSearchText] = useState('');
    const [listPlace, setListPlace] = useState([]);

    return (
        <div className="search-box-wrapper">
            <div className="search-box-container">
                <input
                    className="search-input"
                    value={searchText}
                    onChange={event => {
                        setSearchText(event.target.value);
                    }}
                />
                <Button
                    className="search-button"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        // Search
                        const params = {
                            q: searchText,
                            format: 'json',
                            addressdetails: 1,
                            polygon_geojson: 0,
                        };
                        const queryString = new URLSearchParams(params).toString();
                        const requestOptions = {
                            method: 'GET',
                            redirect: 'follow',
                        };
                        fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                            .then(response => response.text())
                            .then(result => {
                                setListPlace(JSON.parse(result));
                            })
                            .catch(err => console.log('err: ', err));
                    }}
                >
                    Search
                </Button>
            </div>
            {listPlace.length > 0 && (
                <List component="nav" aria-label="search results">
                    {listPlace.map(item => (
                        <div key={item?.place_id}>
                            <ListItem
                                button
                                onClick={() => {
                                    setSelectPosition(item);
                                    setListPlace([]); // Clear the list to hide it
                                }}
                                className="list-item"
                            >
                                <ListItemIcon>
                                    <img
                                        src="./marker.png"
                                        alt="Placeholder"
                                        className="marker-icon"
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item?.display_name} />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            )}
        </div>
    );
}

export default SearchBox;
