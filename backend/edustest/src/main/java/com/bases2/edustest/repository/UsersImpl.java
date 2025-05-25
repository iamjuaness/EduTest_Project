package com.bases2.edustest.repository;

import com.bases2.edustest.dao.UsersDao;
import com.bases2.edustest.entity.Users;
import oracle.jdbc.OracleTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

@Repository
public class UsersImpl implements UsersDao {
    @Autowired
    private final JdbcTemplate jdbcTemplate;

    public UsersImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Map<String, Object> getRecordById(String tableName, int id) {
        return jdbcTemplate.execute(
                "{ call PKG_AUTH.GET_RECORD_BY_ID(?, ?, ?) }",
                (CallableStatementCallback<Map<String, Object>>) cs -> {
                    cs.setString(1, tableName);
                    cs.setInt(2, id);
                    cs.registerOutParameter(3, OracleTypes.CURSOR);
                    cs.execute();
                    try (ResultSet rs = (ResultSet) cs.getObject(3)) {
                        ResultSetMetaData meta = rs.getMetaData();
                        if (rs.next()) {
                            Map<String, Object> result = new HashMap<>();
                            for (int i = 1; i <= meta.getColumnCount(); i++) {
                                result.put(meta.getColumnName(i), rs.getObject(i));
                            }
                            return result;
                        }
                        return null;
                    }
                }
        );
    }


    @Override
    public Users login(String userEmail, String password) {
        Users user = jdbcTemplate.execute("{ call PKG_AUTH.LOGIN_WRAPPER(?, ?, ?, ?, ?, ?, ?, ?, ?, ?) }", new CallableStatementCallback<Users>() {
            @Override
            public Users doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
                cs.setString(1, userEmail);
                cs.setString(2, password);
                cs.registerOutParameter(3, Types.INTEGER); // user_id
                cs.registerOutParameter(4, Types.INTEGER); // role_id
                cs.registerOutParameter(5, Types.INTEGER); // location_id
                cs.registerOutParameter(6, Types.VARCHAR); // user_email
                cs.registerOutParameter(7, Types.VARCHAR); // first_name
                cs.registerOutParameter(8, Types.VARCHAR); // last_name
                cs.registerOutParameter(9, Types.INTEGER); // success
                cs.registerOutParameter(10, Types.VARCHAR); // message
                cs.execute();

                int success = cs.getInt(9);
                String message = cs.getString(10);
                Users user = null;
                if (success == 1) {
                    user = new Users();
                    user.setUserId(cs.getInt(3));
                    user.setRoleId(cs.getInt(4));
                    user.setLocationId(cs.getInt(5));
                    user.setUserEmail(cs.getString(6));
                    user.setFirstName(cs.getString(7));
                    user.setLastName(cs.getString(8));
                    // Do NOT set password!
                } else {
                    // Handle login failure, message variable has the reason
                }
                return user;
            }
        });
        return user;
    }
}
