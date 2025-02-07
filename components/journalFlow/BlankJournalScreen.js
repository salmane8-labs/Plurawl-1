import {
    Text, StyleSheet, View, SafeAreaView, Dimensions, Image, TouchableOpacity, TextInput,
    Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView, Modal
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../globalStyles/styles';

//hello world

export default BlankJournalScreen = () => {
    const { height, width } = Dimensions.get('window')
    const [text, setText] = useState('')
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [buttonPosition, setButtonPosition] = useState(Dimensions.get('window').height - 100); // Initially set to bottomy
    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showEmotionalReasoningText, setShowEmotionalReasoning] = useState(true)
    const [showExampleText, setShowExample] = useState(false)
    const [showRecognizeText, setShowRecognizeText] = useState(false)

    const scrollViewRef = useRef(null);


    const screenHeight = Dimensions.get('window').height;

    const upArrow = require('../../assets/upArrowWhight.png');
    const downArrow = require('../../assets/downArrowRed.png');




    const handleKeyboardDidShow = (event) => {
        const keyboardHeight = event.endCoordinates.height;
        setKeyboardHeight(keyboardHeight);
        setIsKeyboardVisible(true);
        setButtonPosition(screenHeight - keyboardHeight - 550 / 924 * height); // Adjust button position based on keyboard height
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    const handleKeyboardDidHide = () => {
        setIsKeyboardVisible(false);
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
        setButtonPosition(screenHeight - 30 / 924 * height); // Set button to bottom when keyboard hides
    };



    const floatBtnPressHandle = () => {

    };



    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);


    return (
        <SafeAreaView style={{ backgroundColor: "#0f0f0f", height: height }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, flexDirection: 'column', }}>
                <TouchableWithoutFeedback style={{}} onPress={Keyboard.dismiss}>
                    <View style={{ backgroundColor: '#0f0f0f', flex: 1, width: width }}>
                        <View style={{ flexDirection: 'row', width: width - 40 / 429 * width, alignItems: 'center', marginTop: 30 / 924 * height, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 8 / 429 * width }}>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/backArrow.png')}
                                        style={{ height: 24 / 924 * height, width: 24 / 429 * width, resizeMode: 'contain', marginLeft: 20 / 429 * width }}
                                    />
                                </TouchableOpacity>

                                <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF50', textAlign: 'center' }}>Journal</Text>
                            </View>
                            {inputValue ? <TouchableOpacity style={{ height: 36 / 924 * height, width: 72 / 429 * width, alignSelf: 'center' }}>
                                < View
                                    style={{ height: 36 / 924 * height, width: 72 / 429 * width, backgroundColor: '#FFFFFF30', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ color: '#D44740' }}>Done</Text>
                                </View>
                            </TouchableOpacity> : ''}

                        </View>

                        <TextInput placeholder='New Journal' placeholderTextColor={"#fff"}
                            style={{ fontSize: 34, fontWeight: '500', marginTop: 30 / 925 * height, color: '#fff', width: 380 / 429 * width, alignSelf: "center" }} />

                        <ScrollView
                            ref={scrollViewRef}
                            style={{ width: '100%', maxHeight: screenHeight - (isKeyboardVisible ? keyboardHeight + 50 : 50) }}
                        >
                            <TextInput placeholder='Jot your thoughts down here...'
                                placeholderTextColor={"#fff"}
                                style={{ fontSize: 17, fontWeight: '500', margin: 15 / 925 * height, color: '#fff', width: 380 / 429 * width, alignSelf: 'center', height: 600 / 924 * height }}

                                numberOfLines={500}
                                textAlignVertical="top"
                                value={inputValue}
                                onChangeText={setInputValue}
                                maxLength={10000} // Allow up to 1000 characters
                                multiline={true} // Enable multiline input
                                autoFocus={true} // Set to false to prevent auto focus on input
                                onFocus={() => scrollViewRef.current.scrollTo({ y: 0, animated: true })} // Scroll to top when input is focused
                            />
                        </ScrollView>
                        <View style={[styles.buttonContainer, { bottom: isKeyboardVisible ? buttonPosition : 30 }]}>
                            <TouchableOpacity style={{ alignSelf: 'center', padding: 15, backgroundColor: '#252525', borderRadius: 80 }}
                                onPress={() => { setShowModal(true) }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 / 429 * width }}>
                                    <Image source={require('../../assets/colorfullCircle.png')} style={{ height: 24 / 924 * height, width: 24 / 924 * height, resizeMode: 'contain' }} />
                                    {!inputValue ? <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff' }}> Chat with Plural.ai</Text> :
                                        <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff' }}>Analyze with Plurawl.ai</Text>
                                    }
                                </View>

                            </TouchableOpacity>
                        </View>

                        <Modal
                            transparent={true}
                            visible={showModal}
                            animationType='slide'
                        >
                            {firstModal()}
                            <Modal
                                transparent={true}
                                visible={showModal2}
                                animationType='slide'
                            >
                                {secondModal()}
                            </Modal>
                        </Modal>



                    </View>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView >
        </SafeAreaView >

    )


    function firstModal() {
        return <View style={{ height: 451 / 924 * height, width: width, backgroundColor: '#1c1c1c', borderRadius: 24 / 924 * height, position: 'absolute', bottom: 20, padding: 30 / 924 * height }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 / 429 * width }}>
                    <Image source={require('../../assets/colorfullCircle.png')} style={{ height: 24 / 924 * height, width: 24 / 924 * height, resizeMode: 'contain' }} />
                    <Text style={{ fontSize: 15 / 924 * height, fontWeight: '500', color: '#fff' }}> Plural.ai</Text>
                </View>
                <TouchableOpacity onPress={() => setShowModal(false)}>

                    <View
                        style={{ height: 40 / 924 * height, width: 40 / 924 * height, backgroundColor: '#FFFFFF30', borderRadius: 20 / 924 * height, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Image source={require('../../assets/closeIcon.png')}
                            style={{ height: 24 / 924 * height, width: 24 / 924 * height }} />
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 / 924 * height }}>
                <Text style={styles.modalText}>
                    You are experiencing
                </Text>
                <Text style={[styles.modalText, { color: '#D44740' }]}> emotional reasoning </Text>
            </View>
            <Text style={styles.modalText}>
                . Self doubt can result in having anxiety.
                That feeling of anxiety can prevent many people from taking risks, stepping outside
                their comfort zone, being productive, reaching goals, and ultimately living their best life.
            </Text>

            <TouchableOpacity style={[globalStyles.capsuleBtn, { backgroundColor: '#611F1C', marginTop: 40 / 924 * height }]}
                onPress={() => { setShowModal2(true) }}
            >
                <Text style={globalStyles.capsuleBtnText}>Help me understand</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[globalStyles.capsuleBtn, { backgroundColor: '#121212', marginTop: 12 / 924 * height }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Image source={require('../../assets/colorfullCircle.png')}
                        style={{ height: 20 / 924 * height, width: 20 / 924 * height, resizeMode: 'contain' }} />
                    <Text style={globalStyles.capsuleBtnText}>Discuss deeper</Text>

                </View>

            </TouchableOpacity>



        </View>;
    };

    function secondModal() {

        return <View style={{ backgroundColor: '#1c1c1c', height: 540 / 924 * height, alignSelf: 'center', position: 'absolute', bottom: 20, width: width - 20 / 429 * width, borderRadius: 16 / 924 * height, borderWidth: 2, borderColor: '#1C1C1C', padding: 30, paddingTop: 10 }}>
            <TouchableOpacity onPress={() => setShowModal2(false)} style={{ alignSelf: 'flex-end', paddingBottom: 10 / 924 * height }}>

                < View
                    style={{
                        height: 40 / 924 * height, width: 40 / 924 * height, backgroundColor: '#FFFFFF30', borderRadius: 20 / 924 * height,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                    <Image source={require('../../assets/closeIcon.png')}
                        style={{ height: 24 / 924 * height, width: 24 / 924 * height }}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setShowEmotionalReasoning(!showEmotionalReasoningText)
                    setShowExample(false)
                    setShowRecognizeText(false)

                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Image source={require('../../assets/Emotionalreasoning.png')}
                            style={globalStyles.circleImage}
                        />
                        <Text style={[globalStyles.capsuleBtnText, { color: showEmotionalReasoningText ? "#fff" : '#D44740' }]}>Emotional Reasoning</Text>

                    </View>

                    <Image source={showEmotionalReasoningText ? upArrow : downArrow}
                        style={{ height: 24 / 924 * height, width: 24 / 924 * height, resizeMode: 'contain' }}
                    />
                </View>
            </TouchableOpacity>


            {showEmotionalReasoningText ? <Text style={{
                fontSize: 17 / 924 * height,
                fontWeight: '500',
                color: "#fff",
                marginTop: 15 / 924 * height,
            }}>
                Emotional reasoning is a cognitive process by which an individual concludes that their emotional reaction proves
                something is true, despite contrary empirical evidence. Emotional reasoning creates an 'emotional truth', which may
                be in direct conflict with the inverse 'perceptional truth'. It can create feelings of anxiety, fear, and apprehension
                in existing stressful situations, and as such, is often associated with or triggered by panic disorder or anxiety disorder.
            </Text> : ''}

            <TouchableOpacity style={{ marginTop: 35 / 924 * height, alignSelf: 'flex-start' }}
                onPress={() => {
                        setShowExample(!showExampleText),
                        setShowEmotionalReasoning(false),
                        setShowRecognizeText(false)

                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 / 424 * width, justifyContent: 'center' }}>
                    <Text style={[globalStyles.capsuleBtnText, { color: showExampleText ? "#fff" : '#D44740' }]}>Example</Text>
                    <Image source={showExampleText ? upArrow : downArrow}
                        style={{ height: 24 / 924 * height, width: 24 / 924 * height, resizeMode: 'contain' }}
                    />
                </View>
            </TouchableOpacity>
            {showExampleText ? <Text style={{
                fontSize: 17 / 924 * height,
                fontWeight: '500',
                color: '#fff',
                marginTop: 15 / 924 * height,
            }}>
                Emotional reasoning is a cognitive process by which an individual concludes that their emotional reaction proves
                something is true, despite contrary empirical evidence. Emotional reasoning creates an 'emotional truth', which may
                be in direct conflict with the inverse 'perceptional truth'. It can create feelings of anxiety, fear, and apprehension
                in existing stressful situations, and as such, is often associated with or triggered by panic disorder or anxiety disorder.
            </Text> : ''}

            <TouchableOpacity style={{ marginTop: 35 / 924 * height, alignSelf: 'flex-start' }}
                onPress={() => {
                    setShowRecognizeText(!showRecognizeText)
                    setShowExample(false)
                    setShowEmotionalReasoning(false)
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 / 424 * width, justifyContent: 'center' }}>
                    <Text style={[globalStyles.capsuleBtnText, {  color: showRecognizeText? "#fff" : '#D44740'  }]}>How to recognize</Text>
                    <Image source={showRecognizeText ? upArrow : downArrow}
                        style={{ height: 24, width: 24 }}
                    />
                </View>
            </TouchableOpacity>
            {showRecognizeText ? <Text style={{
                fontSize: 17 / 924 * height,
                fontWeight: '500',
                color: '#fff',
                marginTop: 15 / 924 * height,
            }}>
                Emotional reasoning is a cognitive process by which an individual concludes that their emotional reaction proves
                something is true, despite contrary empirical evidence. Emotional reasoning creates an 'emotional truth', which may
                be in direct conflict with the inverse 'perceptional truth'. It can create feelings of anxiety, fear, and apprehension
                in existing stressful situations, and as such, is often associated with or triggered by panic disorder or anxiety disorder.
            </Text> : ''}
        </View>
    };
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlignVertical: 'top', // Align text to the top
    },
    buttonContainer: {
        position: 'absolute',
        right: 0,
        left: 0,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#fff'
    }
})