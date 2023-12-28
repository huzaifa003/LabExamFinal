import React, {useState, useEffect} from 'react';
import { View, Text, Image,  StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-web';

const Tutorial = props => {
    console.log(props.data)
    
    
    return (
        
        <View style={styles.wrapper}>            
           
           
           {/* Table Container */}
           <View style={styles.table}>
                {/* Table Head */}
                <View style={styles.table_head}>
                    <View style={{ width: '33%'}}>
                        <Text style={styles.table_head_captions}>country</Text>
                    </View>
                    <View style={{ width: '33%'}}>
                    <Text style={styles.table_head_captions}>Industry</Text>
                    </View>
                    <View style={{ width: '33%'}}>
                    <Text style={styles.table_head_captions}>Gas_Type</Text>
                    </View>
                </View>

                {/* Table Body - Single Row */}

                {props.data.map ( (item, index) => {
                    console.log(item)
                    return (
                        <View style={styles.table_body_single_row}>
                            <View style={{ width: '33%'}}>
                                <Text style={styles.table_data}>{item.Country}</Text>
                            </View>
                            <View style={{ width: '30%'}}>
                            <Text style={styles.table_data}>{item.Industry}</Text>
                            </View>
                            <View style={{ width: '33%'}}>
                            <Text style={styles.table_data}>{item.Gas_Type}</Text>
                            </View>
                        </View>
                    )
                }
                )}

             
           </View>
           
           

        </View>
        // </ScrollView>
  );
};

export default Tutorial;


const styles = StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,    
    },
    table_head: {
      flexDirection: 'row', 
      borderBottomWidth: 1, 
      borderColor: '#ddd', 
      padding: 7,
      backgroundColor: '#3bcd6b'
  },
  table_head_captions:{
      fontSize: 15,
      color: 'white'
  },
  
  table_body_single_row:{
      backgroundColor: '#fff',
      flexDirection: 'row', 
      borderBottomWidth: 1, 
      borderColor: '#ddd', 
      padding: 7,
  },
  table_data:{  
      fontSize: 11,
  },
  table: {
      margin: 15,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      backgroundColor: '#fff',
  }, 
  
  });
