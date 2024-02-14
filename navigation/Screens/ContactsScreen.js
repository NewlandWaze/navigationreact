import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import Contacts from 'react-native-contacts';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ContactsScreen = () => {
    const [contacts, setContacts] = useState(null);


  useEffect(() => {
    const loadContacts = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts',
              message: 'ContactsList app would like to access your contacts.',
              buttonPositive: 'Accept',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const allContacts = await Contacts.getAll();
            setContacts(allContacts);
          }
        } else {
          const allContacts = await Contacts.getAll();
          setContacts(allContacts);
        }
      } catch (error) {
        console.error('Error fetching contacts: ', error);
      }
    };

    loadContacts();
  }, []);

  const sections = useMemo(() => {
    if (!contacts) {
      return null;
    }

    const sectionsMap = contacts.reduce((acc, contact) => {
        const { familyName } = contact;
        const [firstLetter] = familyName;
      
        return {
          ...acc,
          [firstLetter]: [...(acc[firstLetter] || []), contact],
        };
      }, {});

    return Object.entries(sectionsMap)
      .map(([letter, items]) => ({
        letter,
        items: items.sort((a, b) => a.familyName.localeCompare(b.familyName)),
      }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
  }, [contacts]);

  if (!sections) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {sections.map(({ letter, items }) => (
        <View style={styles.section} key={letter}>
          <Text style={styles.sectionTitle}>{letter}</Text>
          <View style={styles.sectionItems}>
            {items.map(({ givenName, familyName, phoneNumbers, thumbnailPath }, index) => {
              const name = `${givenName} ${familyName}`;
              const phone = phoneNumbers.length ? phoneNumbers[0].number : '-';
              const img = thumbnailPath;

              return (
                <View key={index} style={styles.cardWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                  >
                    <View style={styles.card}>
                      {img ? (
                        <Image
                          alt=""
                          resizeMode="cover"
                          source={{ uri: img }}
                          style={styles.cardImg}
                        />
                      ) : (
                        <View style={[styles.cardImg, styles.cardAvatar]}>
                          <Text style={styles.cardAvatarText}>{name[0]}</Text>
                        </View>
                      )}

                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{name}</Text>

                        <Text style={styles.cardPhone}>{phone}</Text>
                      </View>

                      <View style={styles.cardAction}>
                        <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  section: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardWrapper: {
    width: '50%',
    paddingHorizontal: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  cardImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardAvatar: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPhone: {
    fontSize: 14,
    color: '#666',
  },
  cardAction: {
    marginLeft: 'auto',
  },
});

export default ContactsScreen;
