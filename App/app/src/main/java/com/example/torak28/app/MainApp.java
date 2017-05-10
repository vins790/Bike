package com.example.torak28.app;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;

public class MainApp extends AppCompatActivity {

    private String UserName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_app);

        Bundle bundle = getIntent().getExtras();
        UserName = bundle.getString("UserName");

        String type = "saldo";
        Baner Baner = new Baner();
        Baner.execute(type, UserName);

    }

    public void Rent(View view){
        Intent intent = new Intent(this, Rent.class);
        intent.putExtra("UserName", UserName);
        startActivity(intent);
    }

    public void Back(View view){
        Intent intent = new Intent(this, Back.class);
        intent.putExtra("UserName", UserName);
        startActivity(intent);
    }

    public class Baner extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... params) {
            String type = params[0];
            String saldo_url = "http://erower.stronazen.pl/saldo.php";
            try {
                String login = params[1];
                try {
                    URL url = new URL(saldo_url);
                    HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
                    httpURLConnection.setRequestMethod("POST");
                    httpURLConnection.setDoOutput(true);
                    httpURLConnection.setDoInput(true);
                    OutputStream outputStream = httpURLConnection.getOutputStream();
                    BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                    String post_data = URLEncoder.encode("user_name", "UTF-8") + "=" + URLEncoder.encode(login, "UTF-8");
                    bufferedWriter.write(post_data);
                    bufferedWriter.flush();
                    bufferedWriter.close();
                    outputStream.close();
                    InputStream inputStream = httpURLConnection.getInputStream();
                    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
                    String result = "";
                    String line = "";
                    while ((line = bufferedReader.readLine()) != null) {
                        result += line;
                    }
                    bufferedReader.close();
                    inputStream.close();
                    httpURLConnection.disconnect();
                    xd(result);
                    return result;
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }
    }

    protected void xd(String result) {
        String display = "Saldo: " + result;
        TextView Baner = (TextView) findViewById(R.id.Saldo);
        Baner.setText(display);
    }

}
