import React, { useState, useEffect } from 'react'
import { View, TextInput, Button } from 'react-native'
import { supabase } from '../supabase'


const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (data) {
      console.log('Utilisateur authentifié:', data.user)
      // Mettre à jour l'état global avec l'utilisateur connecté
      setGlobalState({ isAuthenticated: true, user: data.user })
    } else {
      console.log('Aucun utilisateur connecté')
      setGlobalState({ isAuthenticated: false, user: null })
    }
  }

  useEffect(() => {
    checkSession()
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('Utilisateur connecté:', session.user)
          setGlobalState({ isAuthenticated: true, user: session.user })
        } else if (event === 'SIGNED_OUT') {
          console.log('Utilisateur déconnecté')
          setGlobalState({ isAuthenticated: false, user: null })
        }
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Erreur de connexion:', error.message)
      return
    }

    // Vérifier la session après la connexion
    await checkSession()

    if (supabase.auth.session()?.user) {
      console.log('UID de l\'utilisateur après connexion:', supabase.auth.session().user.id)
      
      const { data, error: insertError } = await supabase
        .from('Souvenir')
        .insert([
          {
            title: 'Test',
            image_url: 'url_de_l_image',
            latitude: 35.651124834270476,
            longitude: 10.90117089805746,
            user_id: supabase.auth.session().user.id,
          },
        ])

      if (insertError) {
        console.error('Erreur lors de l\'insertion:', insertError)
      } else {
        console.log('Souvenir ajouté avec succès:', data)
      }
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  )
}

export default Auth
