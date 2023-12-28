import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, TextInput, View, SafeAreaView, Button } from 'react-native';
import { db } from './db';
import { set, ref, get, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import chess from './chess';

import React from 'react';

import Tutorial from './Table';
import { readRemoteFile } from 'react-native-csv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import greenhouse from './greenhouse';
export default function App() {

  const header = ['heading 1', 'heading 2', 'heading 3']
  const data = [
    ['gfg1', 'gfg2', 'gfg3'],
    ['gfg4', 'gfg5', 'gfg6'],
    ['gfg7', 'gfg8', 'gfg9']

  ]

  const [flag, setFlag] = useState(false);


  const [chessData, setChessData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log(greenhouse)

    setFilteredData(greenhouse);
    console.log(chessData)
    const getFlag = () => {
      get(ref(db, "flag"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setFlag(snapshot.val());
          } else {
            set(ref(db, tabularView), false);
            setFlag(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    onValue(ref(db, "flag"), (snapshot) => {
      console.log(snapshot.val());
      setFlag(snapshot.val());
    }
    );
    

    getFlag();

    // const storeData = async ()=> {
    //   const data = await AsyncStorage.getItem('data');
    //   if (data !== null) {
    //     // We have data!!

    //     const parsed = JSON.parse(data);
    //     setGreenhouse(parsed.data);

    //     console.log('Data:',Object.values(parsed.data["2"]) )
    //     setTableHead(Object.values(parsed.data["0"]))

    //     setTableData(parsed.data);
    //     console .log('Dataaaaaa:',tableData )

    //   }
    //   else
    //   {
    //     readRemoteFile(
    //       "https://storage.googleapis.com/kagglesdsdata/datasets/4193939/7240991/Annual%20Greenhouse%20Gas%20%28GHG%29%20Air%20Emissions%20Accounts.csv?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20231228%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231228T072155Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=5424b515a064e646cc5cab35c927857da75e5f06bef02b419d97260701c07dd91d796e7b1e71a08756b980d76c41af46a699387e6868f9e7b8ea86cba0a9e738d15cc49f5f2eb08b681743325a07a06f6c0a4de40045b1aa6922a409251cc81536043549d15444e6ef38ae79f6025f5ffbe3e5743a6d46f7fcf20b35f37163617c9723e5bbd187665fecfb00285097ca96baf8bfaec953b597bb3bc3accfcc1167ac16052a3a7eaaa75b4914ef2b946b9c9e41f1a2896916bd46ba71485606180e51eff159fd74d2f1f8e81b6839db1bd821a6b47f080c3ec8f6e53d1734425a72c4f8c8b5608499d879e6dd842771b08f41ad84612b64355aff839fa83c1e4c",
    //       {
    //         complete: (results) => {
    //           AsyncStorage.setItem('data', JSON.stringify(results));
    //           console.log('Results:', Object.keys(results))
    //           // console.log('Results:', Object.values(results))
    //           setGreenhouse(results);
    //           setTableData(results.data);
    //           setTableHead(results.data["0"]);

    //         }
    //       }
    //     );
    //   }
    // }
    // storeData();

  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = greenhouse.filter((item) =>
      String(item.Industry).toLowerCase().includes(text.toLowerCase()) ||
      String(item.Gas_Type).toLowerCase().includes(text.toLowerCase())
    );


    setFilteredData(filtered);
  };



  return (
    <SafeAreaView style={styles.container}>
      {console.log(filteredData)}
      <View style={{ marginTop: 200 }}>

        <Button title="Tabular View" onPress={() => {
          set(ref(db, "flag"), true);
          setFlag(true);
        }} />

        <br />

        <Button title="Flatlist View" onPress={() => {
          set(ref(db, "flag"), false);
          setFlag(false);
        }
        } />

        <br/>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearch}
        />

        {/* <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.name}>{item.Country}</Text>
              <Text style={styles.score}>{item.Industry}</Text>
              <Text style={styles.seat}>{item.Gas_Type}</Text>

            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        /> */}


        {flag ? <Tutorial header={header} data={filteredData} /> : <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.name}>{item.Country}</Text>
              <Text style={styles.score}>{item.Industry}</Text>
              <Text style={styles.seat}>{item.Gas_Type}</Text>

            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />}


        {/* {filteredData ? <Tutorial header={header} data={filteredData} /> : null} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  ratingFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ratingInput: {
    width: '48%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  countryFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  countryInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#e6e6fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  rank: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  country: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#555',
  },
});
