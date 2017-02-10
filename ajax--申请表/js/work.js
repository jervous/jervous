$(function() {
	//ajaxFuc 函数开头
	//get
	var urlGet = "http://www.hemijiaoyu.com/service/searchApply";

	function ajaxFuc() {

		$.ajax({
			url: urlGet,
			type: "GET",
			dataType: "json",
			data: data,
			error: function(errormsg) {
				console.log(errormsg);
			},
			success: function(successmsg) {
				//从数据库获取资料
				var obj = successmsg;
				var arr = obj.list;
				var str = "";
				var str1 = "";  //申请表查询头部
				

				str1 = "<ul><li>姓名</li>" + "<li>性别</li>" + "<li>出生年月</li>" + "<li>手机号码</li>" + "<li>政治面貌</li>" + "<li>QQ</li>" + "<li>学院</li>" + "<li>系</li>" + "<li>专业</li></ul>";
                
                //判断获取数组长度，创建数据
				if(arr.length > 0) {
					for(var i = 0; i < arr.length; i++) {

						str += "<ul><li>" + arr[i].name + "</li>" + "<li>" + arr[i].sex + "</li>" + "<li>" + arr[i].birthday + "</li>" + "<li>" + arr[i].mobile + "</li>" + "<li>" + arr[i].political + "</li>" + "<li>" + arr[i].qq + "</li>" + "<li>" + arr[i].college + "</li>" + "<li>" + arr[i].faculty + "</li>" + "<li>" + arr[i].major + "</li></ul>";

					}

					var num = str1 + str;
					
					//添加对应样式
					$("#div").html(num);
					$("ul").addClass("ul");
					$("ul:eq(0)").addClass("li0");
					$("li").addClass("li");

					//双击弹出详细信息
					$("ul").dblclick(function() {
						for(var j = 1; j < arr.length + 1; j++) {  //因为头部也是一个ul，所以j从1开始计算
							if(this == $("ul")[j]) {  //判断点击的ul对应数据ul

								$("#newDiv").css({  //详细信息 div 显示
									display: "block"
								});
								var newStr1 = "<center>详细信息</center>";
								var newStr2 = "<input type='button' value='关闭' id='closeBtn'>";
								var newStr =
									"<a>姓名:</a>" + "<span>" + arr[j - 1].name + "</span>" +
									"<a>性别:</a>" + "<span>" + arr[j - 1].sex + "</span>" +
									"<a>出生年月:</a>" + "<span>" + arr[j - 1].birthday + "</span>" +
									"<a>手机号码:</a>" + "<span>" + arr[j - 1].mobile + "</span>" +
									"<a>政治面貌:</a>" + "<span>" + arr[j - 1].political + "</span>" +
									"<a>QQ:</a>" + "<span>" + arr[j - 1].qq + "</span>" +
									"<a>学院:</a>" + "<span>" + arr[j - 1].college + "</span>" +
									"<a>系:</a>" + "<span>" + arr[j - 1].faculty + "</span>" +
									"<a>专业:</a>" + "<span>" + arr[j - 1].major + "</span>" +
									"<a>父亲姓名:</a>" + "<span>" + arr[j - 1].fatherName + "</span>" +
									"<a>父亲电话:</a>" + "<span>" + arr[j - 1].fatherMobile + "</span>" +
									"<a>母亲姓名:</a>" + "<span>" + arr[j - 1].matherName + "</span>" +
									"<a>母亲电话:</a>" + "<span>" + arr[j - 1].matherMobile + "</span>" +
									"<a>家庭住址:</a>" + "<span>" + arr[j - 1].homeAddress + "</span>" +
									"<a>信息来源:</a>" + "<span>" + arr[j - 1].source + "</span>" +
									"<a>专业能力描述:</a>" + "<span>" + arr[j - 1].majorMemo + "</span>" +
									"<a>自我评价描述:</a>" + "<span>" + arr[j - 1].selfMemo + "</span>";

								newNom = newStr1 + newStr2 + newStr;

								$("#newDiv1").html(newNom);

								$("#newDiv1 span:lt(15)").addClass("newDivspan");

								$("#newDiv1 span:gt(14)").addClass("newDivspan newDivspan1");

								$("#closeBtn").click(function() {
									$("#newDiv").css({
										display: "none"
									});
									
								})
							}
						}

					})

					//双击弹出详细信息--结尾
				}

			}

			//success--结尾
		});

	}
	
	ajaxFuc();  //函数自调用
	//ajaxFuc 函数结尾

	//点击查询--开头
	var data = "";
	$("#check").click(function() {
			var names = $("#names").val();
			var numbers = $("#numbers").val();
			var colleges = $("#colleges").val();
			if(names != "") {
				data = {
					name: names
				}
				
				ajaxFuc();
				return;
			}

			if(numbers != "") {
				data = {
					mobile: numbers
				}
				ajaxFuc();
				return;
			}

			if(colleges != "") {
				data = {
					college: colleges
				}
				ajaxFuc();
				return;
			}
		})
		//点击查询--结尾

	//提交表单	

	var name, birthday, mobile, political, qq, college, faculty, major, fatherName, fatherMobile, matherName, matherMobile, homeAddress, majorMemo, selfMemo, sex, source;

	$("#submit").click(function() {
		
		//申请表单内容赋值
		name = $("#name").val();
		sex = $("#sex").val();
		birthday = $("#birthday").val();
		mobile = $("#mobile").val();
		political = $("#political").val();
		qq = $("#qq").val();
		college = $("#college").val();
		faculty = $("#faculty").val();
		major = $("#major").val();
		fatherName = $("#fatherName").val();
		fatherMobile = $("#fatherMobile").val();
		matherName = $("#matherName").val();
		matherMobile = $("#matherMobile").val();
		homeAddress = $("#homeAddress").val();
		source = $("input[name='source']:checked").val(); //获取单选框的value值
		majorMemo = $("#majorMemo").val();
		selfMemo = $("#selfMemo").val();


		var urlPost = "http://www.hemijiaoyu.com/service/addApply";
		
		//将申请表单获取到的元素拼接
		var data_post = "name=" + name + "&sex=" + sex + "&birthday=" + birthday + "&mobile=" + mobile + "&political=" + political + "&qq=" + qq +
			"&college=" + college + "&faculty=" + faculty + "&major=" + major + "&fatherName=" + fatherName +
			"&fatherMobile=" + fatherMobile + "&matherName=" + matherName + "&matherMobile=" + matherMobile +
			"&homeAddress=" + homeAddress + "&source=" + source + "&majorMemo=" + majorMemo + "&selfMemo=" + selfMemo;

		//表单内容为空判断
		if(name == "") {
			alert("请输入您的姓名");
			return;
		} else if(birthday == "") {
			alert("请输入您的出生年月");
			return;
		} else if(mobile == "") {
			alert("请输入您的手机号码");
			return;
		} else if(political == "") {
			alert("请输入您的政治面貌");
			return;
		} else if(qq == "") {
			alert("请输入您的qq");
			return;
		} else if(college == "") {
			alert("请输入您的学院");
			return;
		} else if(faculty == "") {
			alert("请输入您的系");
			return;
		} else if(major == "") {
			alert("请输入您的专业");
			return;
		} else if(fatherName == "") {
			alert("请输入您的父亲姓名");
			return;
		} else if(fatherMobile == "") {
			alert("请输入您父亲的联系方式");
			return;
		} else if(matherName == "") {
			alert("请输入您的母亲姓名");
			return;
		} else if(matherMobile == "") {
			alert("请输入您母亲的联系方式");
			return;
		} else if(homeAddress == "") {
			alert("请输入您的家庭地址");
			return;
		} else if(majorMemo == "") {
			alert("请输入您的专业能力描述");
			return;
		} else if(selfMemo == "") {
			alert("请输入您的自我评价");
			return;
		} 

        
        //提交申请表信息
		$.ajax({
			url: urlPost,
			type: "POST",
			dataType: "html",
			data: data_post,

			success: function(postmsg) {
				if(postmsg == -1) {
					alert("很遗憾，您注册有误，请重新填写~~~")
				} else {
					alert("恭喜您，申请成功！！！")
					console.log(data_post);
				}
 
			}

		});
        //提交申请表信息--结尾
	});

})