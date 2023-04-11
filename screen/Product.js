import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { API_URL } from "../config/constans";
import axios from "axios";
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Product(props) {
  const { id } = props.route.params;
  const [product, setProduct] = useState(null);
  const [LikeAction, setLikeAction] = useState(false);
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
  const onPressButton = () => {
    if (product.count === 1) {
      axios
        .post(`${API_URL}/purchase/${id}`)
        .then((result) => {
		props.navigation.navigate("Main");
          Alert.alert("결제가 완료되었습니다.");
        })
        .catch((error) => {
          Alert.alert("결제가 실패하였습니다.");
          // message.de("결제가 실패하였습니다.");
          console.danger(error);
        });
    } else if (product.count > 1) {
      axios
        .post(`${API_URL}/purchase2/${id}`)
        .then((result) => {
          Alert.alert("결제가 완료되었습니다.");
          // message.info("결제가 완료되었습니다.");
          // getPackage();
          // window.scrollTo(0, 0);
          // navigate("/", { replace: true });
        })
        .catch((error) => {
          Alert.alert("결제가 실패하였습니다.");
          // message.de("결제가 실패하였습니다.");
          console.log(error);
        });
    }
  };
  const onClickHeart = () => {
    setLikeAction(!LikeAction);
    if (product.heart === 0) {
      axios
        .post(`${API_URL}/heart/${id}`)
        .then((result) => {
          Alert.alert("찜하기가 완료되었습니다.");
          //   message.info("찜하기가 완료되었습니다.");
          //   getPackage();
        })
        .catch((error) => {
          Alert.alert("찜하기가 실패하였습니다.");
          //   message.de("찜하기가 실패하였습니다.");
          console.log(error);
        });
    }
    if (product.heart === 1) {
      axios
        .post(`${API_URL}/heart2/${id}`)
        .then((result) => {
          Alert.alert("찜하기가 취소되었습니다.");
          //   message.info("찜하기가 취소되었습니다.");
          //   getPackage();
        })
        .catch((error) => {
          Alert.alert("취소가 실패하였습니다.");
          //   message.de("취소가 실패하였습니다.");
          console.log(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            style={styles.productImage}
            source={{ uri: `${API_URL}/${product.imageUrl}` }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.productSection}>
          <View style={styles.productSeller}>
            <Text style={styles.productName}>{product.p_name} </Text>
            <Image
              style={styles.avatarImage}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/6350/6350271.png",
              }}
            />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.productSeller}>{product.hotel}</Text>
          <TouchableOpacity onPress={onClickHeart}>
            <View style={styles.heart}>
				<Text>
				  {product && product.heart ? (
					<Icon name="heart" size={20} color="#f00" />
				  ) : (
					<Icon name="heart-o" size={20} color="#000" />
				  )}
				</Text>
			</View>
          </TouchableOpacity>
          <Text style={styles.productCount}>남은수량 : {product.count}개</Text>
          <Text style={styles.productPrice}>
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </Text>
          <Text style={styles.productDate}>
            {dayjs(product.p_sdate).format("YY/MM/DD")} ~ {dayjs(product.p_edate).format("YY/MM/DD")}
          </Text>
          <Text style={styles.productDesc}>{product.departure} - {product.redeparture}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={onPressButton}>
        <View
          style={
            product.soldout === 1
              ? styles.purchaseDisabled
              : styles.purchaseButton
          }
        >
          <Text style={styles.purchaseText}>
            {product.soldout === 1 ? "품절" : "구매하기"}
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
	fontSize:20,
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
    fontSize: 24,
    fontWeight: 400,
  },
  productCount: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 8,
  },
  productDate: {
    fontSize: 14,
    marginTop: 4,
    color: "#aaa",
  },
  productDesc: {
    fontSize: 16,
    marginTop: 4,
    color: "#333",
  },
  purchaseButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgb(255,90,88)",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  purchaseText: {
    color: "white",
    fontSize: 20,
  },
  purchaseDisabled: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "gray",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  heart:{
	position:"absolute",
	right : 0,
	width:40,
	height: 40,
	alignItems: "center",
    justifyContent: "center",
  },
});

// export default Product;
