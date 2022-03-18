import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, ScrollView, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const NotesScreen = () => {
    const [currentNote, setCurrentNote] = useState('')
    const [screen, setScreen] = useState('notesScreen')
    const [notes, setNotes] = useState([])

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@todo', JSON.stringify(value || notes))
        } catch (e) {
            console.log(e)
        }
    }

    const createNote = (header, value) => {
        setNotes(prev => [...prev, { id: notes.length + 1, title: header, noteText: value }])
        setScreen('notesScreen')
        storeData(notes)
    }

    const changeNote = (id, header, value) => {
        notes.map(e => { if (e.id == id) { e.title = header, e.noteText = value } })
        setScreen('notesScreen')
        storeData(notes)
    }

    const removeNote = (id) => {
        setNotes(prev => prev.filter(prev => prev.id !== id))
        if (notes.length === 1) { setNotes([]), storeData([]) }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@todo')
            if (value !== null) {
                setNotes(JSON.parse(value))
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => { if (notes.length > 0) { storeData(), console.log(notes) } }, [notes])
    useEffect(() => { getData() }, [])

    return (
        <View style={{ flex: 1, width: '100%', padding: 20 }}>
            {screen == 'notesScreen' && <>
                <Text style={styles.mainHeader}>Мои заметки</Text>
                <View style={{ flex: 8, marginBottom: 20 }}>
                    <ScrollView>{notes.map((e) =>
                        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 15 }}
                         onPress={() => { setScreen('viewMode'), setCurrentNote(e) }} key={e.id}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 , borderWidth: 1, borderRadius: 5}}>
                                <View style={{padding:10, flex: 1 }}>
                                    <Image style={{ width: 40, height: 40 }} source={require('./note.png')} />
                                </View>
                                <View style={{ paddingLeft: 10, flex: 4 }}>
                                    <Text style={{ fontSize: 18, padding: 10, fontWeight: 'bold' }}>{e.title.substr(0, 20)}</Text>
                                    <Text style={{ fontSize: 18, paddingBottom: 30 }}>{e.noteText.substr(0, 20)} ...</Text>
                                </View>
                                <TouchableOpacity style={{ flex: 1.5, justifyContent: 'top', padding: 10 }} onPress={() => removeNote(e.id)}>
                                    <Text style={{color: 'red'}}>Удалить</Text>
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>)}
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={() => setScreen('createNewNote')} style={{ flex: 1 }}>
                    <Text style={styles.createNoteButton}>Создать новую заметку</Text>
                </TouchableOpacity>
            </> || screen == 'createNewNote' && <CreateNewNote pushNewNote={createNote}
                back={() => setScreen('notesScreen')} /> || screen == 'viewMode' && <ViewNote changeNote={changeNote}
                currentNote={currentNote} back={() => setScreen('notesScreen')} />}
        </View>
    )
}


const CreateNewNote = ({ back, pushNewNote }) => {
    const [tittle, onChangeTittle] = useState('')
    const [text, onChangeText] = useState('')
    
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.mainHeader}>Создать заметку</Text>
            <View style={{ flex: 7 }}>
                <TextInput
                    multiline={false}
                    placeholder='Название заметки'
                    style={styles.titleTextInput}
                    value={tittle}
                    onChangeText={onChangeTittle}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    placeholder='Напишите что нибудь ...'
                    style={styles.textInput}
                    value={text}
                    onChangeText={onChangeText}
                />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }} >
                <TouchableOpacity onPress={back}>
                    <Text style={StyleSheet.compose(styles.headerText, styles.button)}>Назад</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pushNewNote(tittle, text)}>
                    <Text style={StyleSheet.compose(styles.headerText, styles.button)}>Создать</Text>
                </TouchableOpacity>
            </View>

        </View>)
}


const ViewNote = ({ currentNote, back, changeNote }) => {
    const [tittle, onChangeTittle] = useState(currentNote.title)
    const [text, onChangeText] = useState(currentNote.noteText)
    
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.mainHeader}>Изменить заметку</Text>
            <View style={{ flex: 7 }}>
                <TextInput
                    multiline={false}
                    placeholder='Название заметки'
                    style={styles.titleTextInput}
                    value={tittle}
                    onChangeText={onChangeTittle}
                />
                <TextInput
                    multiline={true}
                    placeholder='Напишите что нибудь ...'
                    style={styles.textInput}
                    value={text}
                    onChangeText={onChangeText}
                />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }} >
                <TouchableOpacity onPress={back}>
                    <Text style={StyleSheet.compose(styles.headerText, styles.button)}>Назад</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeNote(currentNote.id, tittle, text)}>
                    <Text style={StyleSheet.compose(styles.headerText, styles.button)}>Изменить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 20, flex: 1, textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center'
    },

    createNoteButton: {
        fontSize: 18, textAlign: 'center', borderWidth: 2, borderColor: 'green', borderRadius: 10, padding: 15, color: 'black', fontWeight: 'bold' 
    },

    headerText: {
        color: 'black', fontWeight: 'bold', padding: 15, 
        textAlign: 'center', textAlignVertical: 'center'
    },

    button: {
        height:50, width: 100, borderRadius: 10, borderWidth: 2, borderColor: 'blue'
    },

    titleTextInput: {
        marginBottom: 20, borderWidth: 1, padding: 10, borderRadius: 10, textAlignVertical: 'top', textAlign: 'center', fontWeight: 'bold'
    },

    textInput: {
        borderWidth: 1, padding: 10, borderRadius: 10, textAlignVertical: 'top', height: 350 
    }
});