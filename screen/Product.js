import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { API_URL } from "../config/constans";
import axios from "axios";
import dayjs from "dayjs";

const Product = (props) => {
	const { id } = props.route.params;
	const [product, setProduct] = useState(null);
	useEffect(() => {
		axios
			.get(`${API_URL}/products/${id}`)
			.then((result) => {
				setProduct(result.data.product);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	if (!product) {
		return <ActivityIndicator />;
	}
	const onPressButton=()=>{
		if(product.soldout !==1){
			Alert.alert("구매가 완료되었습니다");
		}else{
			Alert.alert("품절된 상품입니다");
		}
	}
	return (
		<View style={styles.container}>
			<ScrollView>

				<View>
					<Image style={styles.productImage} source={{ uri: `${API_URL}/${product.imageUrl}` }} resizeMode="contain" />
				</View>
				<View style={styles.productSection}>
					<View style={styles.productSeller}>
						<Text style={styles.sellerText}>{product.seller}</Text>
						<Image style={styles.avatarImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/10303/10303300.png" }} />
					</View>
					<View style={styles.divider}></View>
					<Text style={styles.productName}>{product.name}</Text>
					<Text style={styles.productPrice}>{product.price}원</Text>
					<Text style={styles.productDate}>상품등록일: {dayjs(product.createdAt).format('YYYY년 MM월 DD일')}</Text>
					<Text style={styles.productDesc}>{product.description}</Text>
				</View>
			</ScrollView>
			<TouchableOpacity onPress={onPressButton}>
				<View style={product.soldout===1 ? styles.purchaseDisabled : styles.purchaseButton}>
					<Text style={styles.purchaseText}>
						{product.soldout===1 ? "품절" : "구매하기"}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	productImage: {
		width: "100%",
		height: 300,
	},
	productSection: {
		padding: 16,
	},
	productSeller: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatarImage: {
		width: 50,
		height: 50,
	},
	divider: {
		backgroundColor: "#ddd",
		height: 1,
		marginVertical: 16,
	},
	sellerText: {
		color: "#333",
	},
	productName: {
    fontSize:24,
    fontWeight:400
  },
	productPrice: {
    fontSize:18,
    fontWeight:700,
    marginTop:8
  },
	productDate: {
    fontSize:14,
    marginTop:4,
    color:"#aaa"
  },
	productDesc: {
    fontSize:16,
    marginTop:4,
    color:"#333"
  },
  purchaseButton: {
	position:"absolute",
	bottom: 0,
	left:0,
	right:0,
	backgroundColor:"rgb(255,90,88)",
	height:60,
	alignItems:"center",
	justifyContent:"center",
  },
  purchaseText:{
	color:"white",
	fontSize:20,
  },
  purchaseDisabled:{
	position:"absolute",
	bottom: 0,
	left:0,
	right:0,
	backgroundColor:"gray",
	height:60,
	alignItems:"center",
	justifyContent:"center",
  }
});

export default Product;
