import * as React from 'react'

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { letterSpacing } from '@mui/system';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

import {
  //  ImageLoader,
  ReactSuperResponsiveTable
} from 'components';
import { CountryData } from 'shared/types/countryData-interface';

type SearchWords = string | undefined

interface CCProps {
  search: SearchWords;
  tdData: string;
}

const CommonComponent = ({ search, tdData }: CCProps) => {
  return (
    <span>
      {search ? (
        <Highlighter
          highlightClassName='highlighter-background'
          searchWords={[search?.toString()]}
          autoEscape={true}
          textToHighlight={tdData}
        />
      ) : tdData}
    </span>
  )

}

interface Props {
  items: CountryData[];
}
export const CountryBreakdownTable = ({ items }: Props) => {
  const columns = [
    {
      title: 'Country',
      component: (rowData: CountryData, searchWords: SearchWords) => (
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          spacing={2}
        >
          {/* <ImageLoader
            src={rowData.countryInfo.flag}
            cover
          /> */}

          <div>
            <img
              src={rowData.countryInfo.flag}
              // cover
              alt={rowData.country}
              // height='15'
              width='25'
              style={{ backgroundSize: 'cover' }}
            />
          </div>

          <CommonComponent
            search={searchWords}
            tdData={rowData.country.toString()}
          />
        </Stack>
      ),
      // component: (rowData: CountryData) => (
      //   <span>{rowData.activePerOneMillion}</span>
      // ),
    },

    //* We can access the nested felids too
    //   {
    //      title: 'Name',
    //      component: (data) => (
    //*         <span>{data.statusHistory.Placed.by.firstName}</span>
    //      ),
    //   },

    {
      title: 'Cases',
      component: (rowData: CountryData, searchWords: SearchWords) => (
        <CommonComponent
          search={searchWords}
          tdData={rowData.cases.toString()}
        />
      ),
    },
    {
      title: 'Deaths',
      component: (rowData: CountryData, searchWords: SearchWords) => (
        <CommonComponent
          search={searchWords}
          tdData={rowData.deaths.toString()}
        />
      ),
    },
    {
      title: 'Critical',
      component: (rowData: CountryData, searchWords: SearchWords) => (

        <CommonComponent
          search={searchWords}
          tdData={rowData.critical.toString()}
        />
      ),
    },
    {
      title: 'Recovered',
      component: (rowData: CountryData, searchWords: SearchWords) => (

        <CommonComponent
          search={searchWords}
          tdData={rowData.recovered.toString()}
        />

      ),
    },
    {
      title: 'Today\'s Cases',
      component: (rowData: CountryData, searchWords: SearchWords) => (
        <>
          {rowData.todayCases > 0 ? (
            <Chip
              label={`+${rowData.todayCases}`}
              color='warning'
              sx={{
                width: '-webkit-fill-available',
                fontWeight: 600,
                letterSpacing: 1.5,
                backgroundColor: '#ffeeaa',
                // color: 'text.primary'
                color: 'black'
              }}
            />
          ) : <span>0</span>}
        </>

      ),
    },
    {
      title: 'Today\'s Deaths',
      component: (rowData: CountryData, searchWords: SearchWords) => (
        <>
          {rowData.todayDeaths > 0 ? (
            <Chip
              label={`+${rowData.todayDeaths}`}
              color='error'
              sx={{
                width: '-webkit-fill-available',
                fontWeight: 600,
                letterSpacing: 1.5
              }}
            />
          ) : <span>0</span>}
        </>
      ),
    },

    // {
    //   title: 'Action',
    //   component: (rowData: CountryData) => (
    //     <button
    //       color={'info'}
    //       // size="sm"
    //       style={{ width: '100px' }}
    //     //  onClick={() => history.push(`/admin/orders/view/${rowData._id}`)}
    //     >
    //       Details
    //     </button>
    //   ),
    // },
  ];

  return (
    <>
      <ReactSuperResponsiveTable
        columns={columns}
        data={items}
        title={
          'Reported Cases and Deaths by Country'
        }
      />
    </>
  );
};

CountryBreakdownTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
