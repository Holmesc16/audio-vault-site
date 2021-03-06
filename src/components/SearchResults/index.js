import React, { useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { browserHistory } from "react-router";
import { useFetch } from '../../utils';
import { Loader, Item, Button, Icon, Label} from 'semantic-ui-react'
import StyledCard from '../AudioCard/styles'
import { StyledWrapper } from "../../views/Home/styles";

import { cleanTitleName } from '../../utils'

const cleanTagName = tag => tag.replace('https: www.theunticket.com ', '').replace('tag', '').trim()

const SearchResults = props => {
    const {results, searchValue} = props.location.state.state
    return (
    // <div>
    //     <h1>Results for: "{props.location.state.state.searchValue}"</h1>
    //     {JSON.stringify(props.location.state.state.results)}

    // </div>
    <StyledWrapper>
        <StyledCard>
        <div>
            <Item.Group divided>
    <h1>Audio for: "{searchValue}"</h1>
            {results ? results.map((item, index) => {
                    return (
                    <Item key={index}>
                        <Item.Content>
                            <Item.Header className="audio header">{item.audio_title}</Item.Header>
                            <Item.Meta className="audio date">{item.audio_date}</Item.Meta>
                            <Item.Extra className="audio tags-container">
                            {item.audio_tags
                            .split(',')
                            .map(tag => tag.length ? <Label key={tag} className="audio tag">{cleanTagName(tag)}</Label> : '')}
                            </Item.Extra>
                                <Link to={{pathname:`/file/${item.s3_key}`, state: { title: item.audio_title, tags: item.audio_tags, date: item.audio_date, key: item.s3_key} }}>
                                    <Button floated='right' className="">
                                        Listen&nbsp;
                                        <Icon name='play right small'/>
                                    </Button>
                                </Link>
                        </Item.Content>
                    </Item>
                    )
            }) : <Loader size="medium">Loading...</Loader>
            }
            </Item.Group>
        </div>
    </StyledCard>
</StyledWrapper>
    )
}




export default SearchResults;